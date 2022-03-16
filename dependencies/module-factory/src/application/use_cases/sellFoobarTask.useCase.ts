import { UseCase } from '^shared/application/useCase';
import type { Option } from '^shared/core/option';
import { UniqueId } from '^shared/domain/uniqueId';
import type { DiceRoller } from '^shared/random.util';

import type { Factory } from '../../domain/aggregates/factory.aggregate';
import type { FactoryRepository } from '../../domain/repositories/factory.repository';
import { FactoryService } from '../../domain/services/factory.service';
import { FactoryEventFactory } from '../events/event.factory';
import type { SellFoobarTaskInputPort } from '../ports/sellFoobarTaskInputPort.interface';

export class SellFoobarTaskUseCase extends UseCase<SellFoobarTaskInputPort> {
  constructor(
    readonly factoryRepository: FactoryRepository,
    private readonly options: {
      diceRoller?: DiceRoller;
      withClock?: boolean;
    } = {},
  ) {
    super();
  }

  async execute(inputPort: SellFoobarTaskInputPort) {
    const factoryEither = await this.factoryRepository.findById(
      UniqueId.fromUniqueId(inputPort.data.factoryId),
    );
    if (factoryEither.isRight) {
      const optionalFactory = <Option<Factory>>factoryEither.value;
      if (optionalFactory.isPresent) {
        const factory = optionalFactory.get();
        const factoryService = new FactoryService(factory, {
          diceRoller: this.options.diceRoller,
        });
        if (inputPort.data.taskId) {
          await factoryService.executeTask(
            UniqueId.fromUniqueId(inputPort.data.taskId),
          );
        }
        const optionalSelledFoobars = await factoryService.sellFoobars();
        if (optionalSelledFoobars.isPresent) {
          const selledFoobars = optionalSelledFoobars.get();
          const updateEither = await this.factoryRepository.update(factory);
          if (updateEither.isRight) {
            const dispatchEvent = () => {
              this.addIntegrationEvent(
                FactoryEventFactory.sellFoobarTaskSucceeded(
                  inputPort.data.factoryId,
                  selledFoobars.getItems().map((foobar) => foobar.id.toValue()),
                  inputPort.data.robotId,
                ),
              );
            };
            if (this.options.withClock) {
              setTimeout(dispatchEvent, 10000);
            } else {
              dispatchEvent();
            }
            return;
          }
        }
      }
    }
    this.addIntegrationEvent(
      FactoryEventFactory.sellFoobarTaskFailed(
        inputPort.data.factoryId,
        inputPort.data.robotId,
        inputPort.data.taskId,
      ),
    );
  }
}
