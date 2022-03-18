import { UseCase } from '^shared/application/useCase';
import type { Option } from '^shared/core/option';
import { UniqueId } from '^shared/domain/uniqueId';
import { randomInt } from '^shared/random.util';

import type { Factory } from '../../domain/aggregates/factory.aggregate';
import type { FactoryRepository } from '../../domain/repositories/factory.repository';
import { FactoryService } from '../../domain/services/factory.service';
import { FactoryEventFactory } from '../events/event.factory';
import type { MineBarTaskInputPort } from '../ports/mineBarTaskInputPort.interface';

export class MineBarTaskUseCase extends UseCase<MineBarTaskInputPort> {
  constructor(
    readonly factoryRepository: FactoryRepository,
    private readonly withClock?: boolean,
  ) {
    super();
  }

  async execute(inputPort: MineBarTaskInputPort) {
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
        const optionalNewBar = await factoryService.mineBar();
        if (optionalNewBar.isPresent) {
          const newBar = optionalNewBar.get();
          const updateEither = await this.factoryRepository.update(factory);
          if (updateEither.isRight) {
            const dispatchEvent = () => {
              this.addIntegrationEvent(
                FactoryEventFactory.mineBarTaskSucceeded(
                  inputPort.data.factoryId,
                  newBar.id.toValue(),
                  inputPort.data.robotId,
                ),
              );
            };
            if (this.withClock) {
              setTimeout(dispatchEvent, randomInt(500, 2000));
            } else {
              dispatchEvent();
            }
            return;
          }
        }
      }
    }
    this.addIntegrationEvent(
      FactoryEventFactory.mineBarTaskFailed(
        inputPort.data.factoryId,
        inputPort.data.robotId,
        inputPort.data.taskId,
      ),
    );
  }
}
