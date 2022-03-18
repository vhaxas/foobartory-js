/* eslint-disable max-classes-per-file */
import { InputPortFactory } from '^shared/application/inputPortFactory.interface';

import type {
  MoveRobotToWorkstationInput,
  MoveRobotToWorkstationInputPort,
} from '../../../ports/moveRobotToWorkstationInputPort.interface';
import { MoveRobotToWorkstationUseCase } from '../../../use_cases/moveRobotToWorkstation.useCase';
import type { AssignTaskSucceeded } from '../../assignTaskSucceeded.event';
import { AssignTaskSucceededEventHandler } from '../assignTaskSucceededEventHandler.interface';

class InputPortImpl implements MoveRobotToWorkstationInputPort {
  // eslint-disable-next-line no-useless-constructor, no-empty-function
  constructor(readonly data: MoveRobotToWorkstationInput) {}
}

class InputPortFactoryImpl
implements
    InputPortFactory<MoveRobotToWorkstationInputPort, AssignTaskSucceeded> {
  // eslint-disable-next-line class-methods-use-this
  fromIntegrationEvent(
    event: AssignTaskSucceeded,
  ): MoveRobotToWorkstationInputPort {
    const {
      data: { factoryId, robotId, taskId },
    } = event;
    return new InputPortImpl({ factoryId, robotId, taskId });
  }
}

// eslint-disable-next-line max-len
export abstract class MoveRobotToWorkstationAfterAssignTaskSucceededEventHandler extends AssignTaskSucceededEventHandler<
MoveRobotToWorkstationInput,
MoveRobotToWorkstationUseCase
> {
  constructor(useCase: MoveRobotToWorkstationUseCase) {
    super(new InputPortFactoryImpl(), useCase);
  }
}
/* eslint-enable max-classes-per-file */
