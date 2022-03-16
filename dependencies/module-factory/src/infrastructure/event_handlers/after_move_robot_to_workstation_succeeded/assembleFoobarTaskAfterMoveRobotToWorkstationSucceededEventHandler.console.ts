/* eslint-disable no-console */
import { AssembleFoobarTaskAfterMoveRobotToWorkstationSucceededEventHandler } from '../../../application/events/handlers/after_move_robot_to_workstation_succeeded/assembleFoobarTaskAfterMoveRobotToWorkstationSucceededEventHandler.interface';
import type { MoveRobotToWorkstationSucceeded } from '../../../application/events/moveRobotToWorkstationSucceeded.event';

// eslint-disable-next-line max-len
export class AssembleFoobarTaskAfterMoveRobotToWorkstationSucceededConsoleEventHandler extends AssembleFoobarTaskAfterMoveRobotToWorkstationSucceededEventHandler {
  // eslint-disable-next-line class-methods-use-this
  protected async onStart(event: MoveRobotToWorkstationSucceeded) {
    console.log(`Robot "${event.data.robotId}" start to assemble foobar`);
  }

  // eslint-disable-next-line class-methods-use-this
  protected async onSuccess(event: MoveRobotToWorkstationSucceeded) {
    console.log(`Robot "${event.data.robotId}" is assembling foobar`);
  }

  // eslint-disable-next-line class-methods-use-this
  protected async onError(
    event: MoveRobotToWorkstationSucceeded,
    error: Error,
  ) {
    console.log(`Robot "${event.data.robotId}" has failed to assemble foobar`);
    console.error(error);
  }
}
