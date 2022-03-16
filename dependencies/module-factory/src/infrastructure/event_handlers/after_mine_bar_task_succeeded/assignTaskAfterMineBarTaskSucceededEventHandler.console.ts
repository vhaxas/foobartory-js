/* eslint-disable no-console */
import { AssignTaskAfterMineBarTaskSucceededEventHandler } from '../../../application/events/handlers/after_mine_bar_task_succeeded/assignTaskAfterMineBarTaskSucceededEventHandler.interface';
import type { MineBarTaskSucceeded } from '../../../application/events/mineBarTaskSucceeded.event';

// eslint-disable-next-line max-len
export class AssignTaskAfterMineBarTaskSucceededConsoleEventHandler extends AssignTaskAfterMineBarTaskSucceededEventHandler {
  // eslint-disable-next-line class-methods-use-this
  protected async onStart(event: MineBarTaskSucceeded) {
    console.log(
      `Robot "${event.data.robotId}" requested new task after mining bar`,
    );
  }

  // eslint-disable-next-line class-methods-use-this
  protected async onSuccess(event: MineBarTaskSucceeded) {
    console.log(
      `Robot "${event.data.robotId}" was assigned a new task after mining bar`,
    );
  }

  // eslint-disable-next-line class-methods-use-this
  protected async onError(event: MineBarTaskSucceeded, error: Error) {
    console.log(
      `Failing to request a new task for robot "${event.data.robotId}"`,
    );
    console.error(error);
  }
}
