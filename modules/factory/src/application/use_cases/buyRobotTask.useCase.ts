import { UseCase } from '^shared/application/useCase';
import type { Option } from '^shared/core/option';
import { UniqueId } from '^shared/domain/uniqueId';

import type { Factory } from '../../domain/aggregates/factory.aggregate';
import type { FactoryRepository } from '../../domain/repositories/factory.repository';
import { FactoryService } from '../../domain/services/factory.service';
import { FactoryEventFactory } from '../events/event.factory';
import type { BuyRobotTaskInputPort } from '../ports/buyRobotTaskInputPort.interface';

export class BuyRobotTaskUseCase extends UseCase<BuyRobotTaskInputPort> {
  constructor(
    readonly factoryRepository: FactoryRepository,
    private readonly withClock?: boolean,
  ) {
    super();
  }

  async execute(inputPort: BuyRobotTaskInputPort) {
    const factoryEither = await this.factoryRepository.findById(
      UniqueId.fromUniqueId(inputPort.data.factoryId),
    );
    if (factoryEither.isRight) {
      const optionalFactory = <Option<Factory>>factoryEither.value;
      if (optionalFactory.isPresent) {
        const factory = optionalFactory.get();
        const factoryService = new FactoryService(factory);
        if (inputPort.data.taskId) {
          await factoryService.executeTask(
            UniqueId.fromUniqueId(inputPort.data.taskId),
          );
        }
        const optionalNewRobot = await factoryService.buyNewRobot();
        if (optionalNewRobot.isPresent) {
          const newRobot = optionalNewRobot.get();
          const updateEither = await this.factoryRepository.update(factory);
          if (updateEither.isRight) {
            const dispatchEvent = () => {
              this.addIntegrationEvent(
                FactoryEventFactory.buyRobotTaskSucceeded(
                  inputPort.data.factoryId,
                  newRobot.id.toValue(),
                  inputPort.data.robotId,
                ),
              );
            };
            if (this.withClock) {
              setTimeout(dispatchEvent);
            } else {
              dispatchEvent();
            }
            return;
          }
        }
      }
    }
    this.addIntegrationEvent(
      FactoryEventFactory.buyRobotTaskFailed(
        inputPort.data.factoryId,
        inputPort.data.robotId,
        inputPort.data.taskId,
      ),
    );
  }
}
