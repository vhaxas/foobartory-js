/* eslint-disable max-classes-per-file */
import { InputPortFactory } from '^shared/application/inputPortFactory.interface';

import type {
  AssignTaskInput,
  AssignTaskInputPort,
} from '../../../ports/assignTaskInputPort.interface';
import { AssignTaskUseCase } from '../../../use_cases/assignTask.useCase';
import type { MineBarTaskSucceeded } from '../../mineBarTaskSucceeded.event';
import { MineBarTaskSucceededEventHandler } from '../mineBarTaskSucceededEventHandler.interface';

class InputPortImpl implements AssignTaskInputPort {
  // eslint-disable-next-line no-useless-constructor, no-empty-function
  constructor(readonly data: AssignTaskInput) {}
}

class InputPortFactoryImpl
implements InputPortFactory<AssignTaskInputPort, MineBarTaskSucceeded> {
  // eslint-disable-next-line class-methods-use-this
  fromIntegrationEvent(event: MineBarTaskSucceeded): AssignTaskInputPort {
    const {
      data: { factoryId, robotId },
    } = event;
    return new InputPortImpl({ factoryId, robotId });
  }
}

// eslint-disable-next-line max-len
export abstract class AssignTaskAfterMineBarTaskSucceededEventHandler extends MineBarTaskSucceededEventHandler<
AssignTaskInput,
AssignTaskUseCase
> {
  constructor(useCase: AssignTaskUseCase) {
    super(new InputPortFactoryImpl(), useCase);
  }
}
/* eslint-enable max-classes-per-file */
