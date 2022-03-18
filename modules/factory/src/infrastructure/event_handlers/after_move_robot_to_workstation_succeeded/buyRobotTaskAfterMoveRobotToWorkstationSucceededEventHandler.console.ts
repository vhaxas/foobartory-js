/* eslint-disable no-console */
import { BuyRobotTaskAfterMoveRobotToWorkstationSucceededEventHandler } from '../../../application/events/handlers/after_move_robot_to_workstation_succeeded/buyRobotTaskAfterMoveRobotToWorkstationSucceededEventHandler.interface';
import type { MoveRobotToWorkstationSucceeded } from '../../../application/events/moveRobotToWorkstationSucceeded.event';

// eslint-disable-next-line max-len
export class BuyRobotTaskAfterMoveRobotToWorkstationSucceededConsoleEventHandler extends BuyRobotTaskAfterMoveRobotToWorkstationSucceededEventHandler {
  // eslint-disable-next-line class-methods-use-this
  protected async onStart(event: MoveRobotToWorkstationSucceeded) {
    console.log(`Robot "${event.data.robotId}" start to buy robot`);
  }

  // eslint-disable-next-line class-methods-use-this
  protected async onSuccess(event: MoveRobotToWorkstationSucceeded) {
    console.log(`Robot "${event.data.robotId}" is buying robot`);
  }

  // eslint-disable-next-line class-methods-use-this
  protected async onError(
    event: MoveRobotToWorkstationSucceeded,
    error: Error,
  ) {
    console.log(`Robot "${event.data.robotId}" has failed to buy robot`);
    console.error(error);
  }
}
