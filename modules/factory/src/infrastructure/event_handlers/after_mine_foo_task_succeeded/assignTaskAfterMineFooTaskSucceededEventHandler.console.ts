/* eslint-disable no-console */
import { AssignTaskAfterMineFooTaskSucceededEventHandler } from '../../../application/events/handlers/after_mine_foo_task_succeeded/assignTaskAfterMineFooTaskSucceededEventHandler.interface';
import type { MineFooTaskSucceeded } from '../../../application/events/mineFooTaskSucceeded.event';

// eslint-disable-next-line max-len
export class AssignTaskAfterMineFooTaskSucceededConsoleEventHandler extends AssignTaskAfterMineFooTaskSucceededEventHandler {
  // eslint-disable-next-line class-methods-use-this
  protected async onStart(event: MineFooTaskSucceeded) {
    console.log(
      `Robot "${event.data.robotId}" requested new task after mining foo`,
    );
  }

  // eslint-disable-next-line class-methods-use-this
  protected async onSuccess(event: MineFooTaskSucceeded) {
    console.log(
      `Robot "${event.data.robotId}" was assigned a new task after mining foo`,
    );
  }

  // eslint-disable-next-line class-methods-use-this
  protected async onError(event: MineFooTaskSucceeded, error: Error) {
    console.log(
      `Failing to request a new task for robot "${event.data.robotId}"`,
    );
    console.error(error);
  }
}
