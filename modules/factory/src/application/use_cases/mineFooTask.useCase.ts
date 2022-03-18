import { UseCase } from '^shared/application/useCase';
import type { Option } from '^shared/core/option';
import { UniqueId } from '^shared/domain/uniqueId';

import type { Factory } from '../../domain/aggregates/factory.aggregate';
import type { FactoryRepository } from '../../domain/repositories/factory.repository';
import { FactoryService } from '../../domain/services/factory.service';
import { FactoryEventFactory } from '../events/event.factory';
import type { MineFooTaskInputPort } from '../ports/mineFooTaskInputPort.interface';

export class MineFooTaskUseCase extends UseCase<MineFooTaskInputPort> {
  constructor(
    readonly factoryRepository: FactoryRepository,
    private readonly withClock?: boolean,
  ) {
    super();
  }

  async execute(inputPort: MineFooTaskInputPort) {
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
        const optionalNewFoo = await factoryService.mineFoo();
        if (optionalNewFoo.isPresent) {
          const newFoo = optionalNewFoo.get();
          const updateEither = await this.factoryRepository.update(factory);
          if (updateEither.isRight) {
            const dispatchEvent = () => {
              this.addIntegrationEvent(
                FactoryEventFactory.mineFooTaskSucceeded(
                  inputPort.data.factoryId,
                  newFoo.id.toValue(),
                  inputPort.data.robotId,
                ),
              );
            };
            if (this.withClock) {
              setTimeout(dispatchEvent, 1000);
            } else {
              dispatchEvent();
            }
            return;
          }
        }
      }
    }
    this.addIntegrationEvent(
      FactoryEventFactory.mineFooTaskFailed(
        inputPort.data.factoryId,
        inputPort.data.robotId,
        inputPort.data.taskId,
      ),
    );
  }
}
