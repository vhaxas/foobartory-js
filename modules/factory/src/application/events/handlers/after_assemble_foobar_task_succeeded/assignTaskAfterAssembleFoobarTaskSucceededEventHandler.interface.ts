/* eslint-disable max-classes-per-file */
import { InputPortFactory } from '^shared/application/inputPortFactory.interface';

import type {
  AssignTaskInput,
  AssignTaskInputPort,
} from '../../../ports/assignTaskInputPort.interface';
import { AssignTaskUseCase } from '../../../use_cases/assignTask.useCase';
import type { AssembleFoobarTaskSucceeded } from '../../assembleFoobarTaskSucceeded.event';
import { AssembleFoobarTaskSucceededEventHandler } from '../assembleFoobarTaskSucceededEventHandler.interface';

class InputPortImpl implements AssignTaskInputPort {
  // eslint-disable-next-line no-useless-constructor, no-empty-function
  constructor(readonly data: AssignTaskInput) {}
}

class InputPortFactoryImpl
implements InputPortFactory<AssignTaskInputPort, AssembleFoobarTaskSucceeded> {
  // eslint-disable-next-line class-methods-use-this
  fromIntegrationEvent(
    event: AssembleFoobarTaskSucceeded,
  ): AssignTaskInputPort {
    const {
      data: { factoryId, robotId },
    } = event;
    return new InputPortImpl({ factoryId, robotId });
  }
}

// eslint-disable-next-line max-len
export abstract class AssignTaskAfterAssembleFoobarTaskSucceededEventHandler extends AssembleFoobarTaskSucceededEventHandler<
AssignTaskInput,
AssignTaskUseCase
> {
  constructor(useCase: AssignTaskUseCase) {
    super(new InputPortFactoryImpl(), useCase);
  }
}
/* eslint-enable max-classes-per-file */
