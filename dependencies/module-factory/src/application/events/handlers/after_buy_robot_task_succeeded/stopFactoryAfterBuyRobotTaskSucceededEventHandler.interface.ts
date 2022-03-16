/* eslint-disable max-classes-per-file */
import { InputPortFactory } from '^shared/application/inputPortFactory.interface';
import type { Option } from '^shared/core/option';
import { UniqueId } from '^shared/domain/uniqueId';

import type { Factory } from '../../../../domain/aggregates/factory.aggregate';
import { FactoryService } from '../../../../domain/services/factory.service';
import type {
  StopFactoryInput,
  StopFactoryInputPort,
} from '../../../ports/stopFactoryInputPort.interface';
import { StopFactoryUseCase } from '../../../use_cases/stopFactory.useCase';
import type { BuyRobotTaskSucceeded } from '../../buyRobotTaskSucceeded.event';
import { BuyRobotTaskSucceededEventHandler } from '../buyRobotTaskSucceededEventHandler.interface';

class InputPortImpl implements StopFactoryInputPort {
  // eslint-disable-next-line no-useless-constructor, no-empty-function
  constructor(readonly data: StopFactoryInput) {}
}

class InputPortFactoryImpl
implements InputPortFactory<StopFactoryInputPort, BuyRobotTaskSucceeded> {
  // eslint-disable-next-line class-methods-use-this
  fromIntegrationEvent(event: BuyRobotTaskSucceeded): StopFactoryInputPort {
    const {
      data: { factoryId, newRobotId, robotId },
    } = event;
    return new InputPortImpl({ factoryId, newRobotId, robotId });
  }
}

// eslint-disable-next-line max-len
export abstract class StopFactoryAfterBuyRobotTaskSucceededEventHandler extends BuyRobotTaskSucceededEventHandler<
StopFactoryInput,
StopFactoryUseCase
> {
  constructor(useCase: StopFactoryUseCase) {
    super(new InputPortFactoryImpl(), useCase);
  }

  protected async runIf(event: BuyRobotTaskSucceeded) {
    const factoryEither = await this.useCase.factoryRepository.findById(
      UniqueId.fromUniqueId(event.data.factoryId),
    );
    if (factoryEither.isRight) {
      const optionalFactory = <Option<Factory>>factoryEither.value;
      if (optionalFactory.isPresent) {
        const factory = optionalFactory.get();
        const factoryService = new FactoryService(factory);
        return factoryService.shouldStopFactory();
      }
    }
    return false;
  }
}
/* eslint-enable max-classes-per-file */
