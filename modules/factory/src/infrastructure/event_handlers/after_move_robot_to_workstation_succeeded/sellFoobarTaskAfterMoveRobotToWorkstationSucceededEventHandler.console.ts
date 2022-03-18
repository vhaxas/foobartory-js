/* eslint-disable no-console */
import { SellFoobarTaskAfterMoveRobotToWorkstationSucceededEventHandler } from '../../../application/events/handlers/after_move_robot_to_workstation_succeeded/sellFoobarTaskAfterMoveRobotToWorkstationSucceededEventHandler.interface';
import type { MoveRobotToWorkstationSucceeded } from '../../../application/events/moveRobotToWorkstationSucceeded.event';

// eslint-disable-next-line max-len
export class SellFoobarTaskAfterMoveRobotToWorkstationSucceededConsoleEventHandler extends SellFoobarTaskAfterMoveRobotToWorkstationSucceededEventHandler {
  // eslint-disable-next-line class-methods-use-this
  protected async onStart(event: MoveRobotToWorkstationSucceeded) {
    console.log(`Robot "${event.data.robotId}" start to sell foobars`);
  }

  // eslint-disable-next-line class-methods-use-this
  protected async onSuccess(event: MoveRobotToWorkstationSucceeded) {
    console.log(`Robot "${event.data.robotId}" is selling foobars`);
  }

  // eslint-disable-next-line class-methods-use-this
  protected async onError(
    event: MoveRobotToWorkstationSucceeded,
    error: Error,
  ) {
    console.log(`Robot "${event.data.robotId}" has failed to sell foobars`);
    console.error(error);
  }
}
