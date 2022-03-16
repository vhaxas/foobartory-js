import { UseCase } from '^shared/application/useCase';
import type { Option } from '^shared/core/option';
import { UniqueId } from '^shared/domain/uniqueId';

import type { Factory } from '../../domain/aggregates/factory.aggregate';
import type { FactoryRepository } from '../../domain/repositories/factory.repository';
import { FactoryService } from '../../domain/services/factory.service';
import { FactoryEventFactory } from '../events/event.factory';
import type { AssignTaskInputPort } from '../ports/assignTaskInputPort.interface';

export class AssignTaskUseCase extends UseCase<AssignTaskInputPort> {
  constructor(readonly factoryRepository: FactoryRepository) {
    super();
  }

  async execute(inputPort: AssignTaskInputPort) {
    const factoryEither = await this.factoryRepository.findById(
      UniqueId.fromUniqueId(inputPort.data.factoryId),
    );
    if (factoryEither.isRight) {
      const optionalFactory = <Option<Factory>>factoryEither.value;
      if (optionalFactory.isPresent) {
        const factory = optionalFactory.get();
        console.dir(
          {
            nbRobots: factory.getNumberOfRobots(),
            nbFoos: factory.getNumberOfFoos(),
            nbBars: factory.getNumberOfBars(),
            nbFoobars: factory.getNumberOfFoobars(),
            money: factory.getMoney(),
          },
          { depth: null },
        );
        const factoryService = new FactoryService(factory);
        if (inputPort.data.robotId) {
          await factoryService.completeTask(
            UniqueId.fromUniqueId(inputPort.data.robotId),
          );
        }
        const optionalRobots = await factoryService.assignTask(
          inputPort.data.robotId
            ? UniqueId.fromUniqueId(inputPort.data.robotId)
            : null,
        );
        if (optionalRobots.isPresent) {
          const updateEither = await this.factoryRepository.update(factory);
          if (updateEither.isRight) {
            optionalRobots.get().forEachItems((robot) => {
              this.addIntegrationEvent(
                FactoryEventFactory.assignTaskSucceeded(
                  factory.id.toValue(),
                  robot.id.toValue(),
                  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                  robot.getAssignedTask()!.id.toValue(),
                ),
              );
            });
            return;
          }
        }
      }
    }
    this.addIntegrationEvent(FactoryEventFactory.assignTaskFailed());
  }
}
