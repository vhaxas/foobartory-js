/* eslint-disable max-classes-per-file */
import { InputPortFactory } from '^shared/application/inputPortFactory.interface';

import type {
  AssignTaskInput,
  AssignTaskInputPort,
} from '../../../ports/assignTaskInputPort.interface';
import { AssignTaskUseCase } from '../../../use_cases/assignTask.useCase';
import type { AssembleFoobarTaskFailed } from '../../assembleFoobarTaskFailed.event';
import { AssembleFoobarTaskFailedEventHandler } from '../assembleFoobarTaskFailedEventHandler.interface';

class InputPortImpl implements AssignTaskInputPort {
  // eslint-disable-next-line no-useless-constructor, no-empty-function
  constructor(readonly data: AssignTaskInput) {}
}

class InputPortFactoryImpl
implements InputPortFactory<AssignTaskInputPort, AssembleFoobarTaskFailed> {
  // eslint-disable-next-line class-methods-use-this
  fromIntegrationEvent(event: AssembleFoobarTaskFailed): AssignTaskInputPort {
    const {
      data: { factoryId, robotId, taskId },
    } = event;
    return new InputPortImpl({ factoryId, robotId, taskId });
  }
}

// eslint-disable-next-line max-len
export abstract class AssignTaskAfterAssembleFoobarTaskFailedEventHandler extends AssembleFoobarTaskFailedEventHandler<
AssignTaskInput,
AssignTaskUseCase
> {
  constructor(useCase: AssignTaskUseCase) {
    super(new InputPortFactoryImpl(), useCase);
  }
}
/* eslint-enable max-classes-per-file */
