/* eslint-disable no-console */
import { AssignTaskAfterMineFooTaskFailedEventHandler } from '../../../application/events/handlers/after_mine_foo_task_failed/assignTaskAfterMineFooTaskFailedEventHandler.interface';
import type { MineFooTaskFailed } from '../../../application/events/mineFooTaskFailed.event';

// eslint-disable-next-line max-len
export class AssignTaskAfterMineFooTaskFailedConsoleEventHandler extends AssignTaskAfterMineFooTaskFailedEventHandler {
  // eslint-disable-next-line class-methods-use-this
  protected async onStart(event: MineFooTaskFailed) {
    console.log(
      `Robot "${event.data.robotId}" requested new task after failing to mine foo`,
    );
  }

  // eslint-disable-next-line class-methods-use-this
  protected async onSuccess(event: MineFooTaskFailed) {
    console.log(
      `Robot "${event.data.robotId}" was assigned a new task after failing to mine foo`,
    );
  }

  // eslint-disable-next-line class-methods-use-this
  protected async onError(event: MineFooTaskFailed, error: Error) {
    console.log(
      `Failing to request a new task for robot "${event.data.robotId}"`,
    );
    console.error(error);
  }
}
