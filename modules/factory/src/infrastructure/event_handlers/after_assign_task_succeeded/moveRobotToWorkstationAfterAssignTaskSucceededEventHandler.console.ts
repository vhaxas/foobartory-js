/* eslint-disable no-console */
import type { AssignTaskSucceeded } from '../../../application/events/assignTaskSucceeded.event';
import { MoveRobotToWorkstationAfterAssignTaskSucceededEventHandler } from '../../../application/events/handlers/after_assign_task_succeeded/moveRobotToWorkstationAfterAssignTaskSucceededEventHandler.interface';

// eslint-disable-next-line max-len
export class MoveRobotToWorkstationAfterAssignTaskSucceededConsoleEventHandler extends MoveRobotToWorkstationAfterAssignTaskSucceededEventHandler {
  // eslint-disable-next-line class-methods-use-this
  protected async onStart(event: AssignTaskSucceeded) {
    console.log(`Robot "${event.data.robotId}" starts to move to workstation`);
  }

  // eslint-disable-next-line class-methods-use-this
  protected async onSuccess(event: AssignTaskSucceeded) {
    console.log(`Robot "${event.data.robotId}" is moving to workstation`);
  }

  // eslint-disable-next-line class-methods-use-this
  protected async onError(event: AssignTaskSucceeded, error: Error) {
    console.log(`Robot "${event.data.robotId}" slipped`);
    console.error(error);
  }
}
