import { UseCase } from '^shared/application/useCase';
import type { Option } from '^shared/core/option';
import { UniqueId } from '^shared/domain/uniqueId';
import type { Gambler } from '^shared/random.util';

import type { Factory } from '../../domain/aggregates/factory.aggregate';
import type { FactoryRepository } from '../../domain/repositories/factory.repository';
import { FactoryService } from '../../domain/services/factory.service';
import { FactoryEventFactory } from '../events/event.factory';
import type { AssembleFoobarTaskInputPort } from '../ports/assembleFoobarTaskInputPort.interface';

export class AssembleFoobarTaskUseCase extends UseCase<AssembleFoobarTaskInputPort> {
  constructor(
    readonly factoryRepository: FactoryRepository,
    private readonly options: { gambler?: Gambler; withClock?: boolean } = {},
  ) {
    super();
  }

  async execute(inputPort: AssembleFoobarTaskInputPort) {
    const factoryEither = await this.factoryRepository.findById(
      UniqueId.fromUniqueId(inputPort.data.factoryId),
    );
    if (factoryEither.isRight) {
      const optionalFactory = <Option<Factory>>factoryEither.value;
      if (optionalFactory.isPresent) {
        const factory = optionalFactory.get();
        const factoryService = new FactoryService(factory, {
          gambler: this.options.gambler,
        });
        if (inputPort.data.taskId) {
          await factoryService.executeTask(
            UniqueId.fromUniqueId(inputPort.data.taskId),
          );
        }
        const optionalFoobar = await factoryService.assembleFoobar();
        if (optionalFoobar.isPresent) {
          const newFoobar = optionalFoobar.get();
          const updateEither = await this.factoryRepository.update(factory);
          if (updateEither.isRight) {
            const dispatchEvent = () => {
              this.addIntegrationEvent(
                FactoryEventFactory.assembleFoobarTaskSucceeded(
                  inputPort.data.factoryId,
                  newFoobar.id.toValue(),
                  inputPort.data.robotId,
                ),
              );
            };
            if (this.options.withClock) {
              setTimeout(dispatchEvent, 2000);
            } else {
              dispatchEvent();
            }
            return;
          }
        }
      }
    }
    this.addIntegrationEvent(
      FactoryEventFactory.assembleFoobarTaskFailed(
        inputPort.data.factoryId,
        inputPort.data.robotId,
        inputPort.data.taskId,
      ),
    );
  }
}
