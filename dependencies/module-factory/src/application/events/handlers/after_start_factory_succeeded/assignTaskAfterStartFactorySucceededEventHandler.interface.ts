/* eslint-disable max-classes-per-file */
import { InputPortFactory } from '^shared/application/inputPortFactory.interface';
import type { Option } from '^shared/core/option';
import { UniqueId } from '^shared/domain/uniqueId';

import type { Factory } from '../../../../domain/aggregates/factory.aggregate';
import { FactoryService } from '../../../../domain/services/factory.service';
import type {
  AssignTaskInput,
  AssignTaskInputPort,
} from '../../../ports/assignTaskInputPort.interface';
import { AssignTaskUseCase } from '../../../use_cases/assignTask.useCase';
import type { StartFactorySucceeded } from '../../startFactorySucceeded.event';
import { StartFactorySucceededEventHandler } from '../startFactorySucceededEventHandler.interface';

class InputPortImpl implements AssignTaskInputPort {
  // eslint-disable-next-line no-useless-constructor, no-empty-function
  constructor(readonly data: AssignTaskInput) {}
}

class InputPortFactoryImpl
implements InputPortFactory<AssignTaskInputPort, StartFactorySucceeded> {
  // eslint-disable-next-line class-methods-use-this
  fromIntegrationEvent(event: StartFactorySucceeded): AssignTaskInputPort {
    const {
      data: { factoryId },
    } = event;
    return new InputPortImpl({ factoryId });
  }
}

// eslint-disable-next-line max-len
export abstract class AssignTaskAfterStartFactorySucceededEventHandler extends StartFactorySucceededEventHandler<
AssignTaskInput,
AssignTaskUseCase
> {
  constructor(useCase: AssignTaskUseCase) {
    super(new InputPortFactoryImpl(), useCase);
  }

  protected async runIf(event: StartFactorySucceeded) {
    const factoryEither = await this.useCase.factoryRepository.findById(
      UniqueId.fromUniqueId(event.data.factoryId),
    );
    if (factoryEither.isRight) {
      const optionalFactory = <Option<Factory>>factoryEither.value;
      if (optionalFactory.isPresent) {
        const factory = optionalFactory.get();
        const factoryService = new FactoryService(factory);
        return !(await factoryService.shouldStopFactory());
      }
    }
    return false;
  }
}
/* eslint-enable max-classes-per-file */
