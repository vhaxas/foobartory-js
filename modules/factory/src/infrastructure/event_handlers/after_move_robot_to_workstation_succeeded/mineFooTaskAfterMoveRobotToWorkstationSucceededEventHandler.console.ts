/* eslint-disable no-console */
import { MineFooTaskAfterMoveRobotToWorkstationSucceededEventHandler } from '../../../application/events/handlers/after_move_robot_to_workstation_succeeded/mineFooTaskAfterMoveRobotToWorkstationSucceededEventHandler.interface';
import type { MoveRobotToWorkstationSucceeded } from '../../../application/events/moveRobotToWorkstationSucceeded.event';

// eslint-disable-next-line max-len
export class MineFooTaskAfterMoveRobotToWorkstationSucceededConsoleEventHandler extends MineFooTaskAfterMoveRobotToWorkstationSucceededEventHandler {
  // eslint-disable-next-line class-methods-use-this
  protected async onStart(event: MoveRobotToWorkstationSucceeded) {
    console.log(`Robot "${event.data.robotId}" start to mine foo`);
  }

  // eslint-disable-next-line class-methods-use-this
  protected async onSuccess(event: MoveRobotToWorkstationSucceeded) {
    console.log(`Robot "${event.data.robotId}" is mining foo`);
  }

  // eslint-disable-next-line class-methods-use-this
  protected async onError(
    event: MoveRobotToWorkstationSucceeded,
    error: Error,
  ) {
    console.log(`Robot "${event.data.robotId}" has failed to mine foo`);
    console.error(error);
  }
}
