import { UseCase } from '^shared/application/useCase';
import type { Option } from '^shared/core/option';
import { UniqueId } from '^shared/domain/uniqueId';

import type { Factory } from '../../domain/aggregates/factory.aggregate';
import type { FactoryRepository } from '../../domain/repositories/factory.repository';
import { FactoryService } from '../../domain/services/factory.service';
import { FactoryEventFactory } from '../events/event.factory';
import type { StopFactoryInputPort } from '../ports/stopFactoryInputPort.interface';

export class StopFactoryUseCase extends UseCase<StopFactoryInputPort> {
  constructor(readonly factoryRepository: FactoryRepository) {
    super();
  }

  async execute(inputPort: StopFactoryInputPort) {
    const factoryEither = await this.factoryRepository.findById(
      UniqueId.fromUniqueId(inputPort.data.factoryId),
    );
    if (factoryEither.isRight) {
      const optionalFactory = <Option<Factory>>factoryEither.value;
      if (optionalFactory.isPresent) {
        const factory = optionalFactory.get();
        const factoryService = new FactoryService(factory);
        await factoryService.stopFactory();
        this.addIntegrationEvent(
          FactoryEventFactory.stopFactorySucceeded(factory.id.toValue()),
        );
        return;
      }
    }
    this.addIntegrationEvent(FactoryEventFactory.stopFactoryFailed());
  }
}
