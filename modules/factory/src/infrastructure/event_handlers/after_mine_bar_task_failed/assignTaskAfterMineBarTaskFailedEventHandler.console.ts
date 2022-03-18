/* eslint-disable no-console */
import { AssignTaskAfterMineBarTaskFailedEventHandler } from '../../../application/events/handlers/after_mine_bar_task_failed/assignTaskAfterMineBarTaskFailedEventHandler.interface';
import type { MineBarTaskFailed } from '../../../application/events/mineBarTaskFailed.event';

// eslint-disable-next-line max-len
export class AssignTaskAfterMineBarTaskFailedConsoleEventHandler extends AssignTaskAfterMineBarTaskFailedEventHandler {
  // eslint-disable-next-line class-methods-use-this
  protected async onStart(event: MineBarTaskFailed) {
    console.log(
      `Robot "${event.data.robotId}" requested new task after failing to mine bar`,
    );
  }

  // eslint-disable-next-line class-methods-use-this
  protected async onSuccess(event: MineBarTaskFailed) {
    console.log(
      `Robot "${event.data.robotId}" was assigned a new task after failing to mine bar`,
    );
  }

  // eslint-disable-next-line class-methods-use-this
  protected async onError(event: MineBarTaskFailed, error: Error) {
    console.log(
      `Failing to request a new task for robot "${event.data.robotId}"`,
    );
    console.error(error);
  }
}
