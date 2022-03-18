/* eslint-disable no-console */
import { AssignTaskAfterSellFoobarTaskSucceededEventHandler } from '../../../application/events/handlers/after_sell_foobar_task_succeeded/assignTaskAfterSellFoobarTaskSucceededEventHandler.interface';
import type { SellFoobarTaskSucceeded } from '../../../application/events/sellFoobarTaskSucceeded.event';

// eslint-disable-next-line max-len
export class AssignTaskAfterSellFoobarTaskSucceededConsoleEventHandler extends AssignTaskAfterSellFoobarTaskSucceededEventHandler {
  // eslint-disable-next-line class-methods-use-this
  protected async onStart(event: SellFoobarTaskSucceeded) {
    console.log(
      `Robot "${event.data.robotId}" requested new task after selling foobar`,
    );
  }

  // eslint-disable-next-line class-methods-use-this
  protected async onSuccess(event: SellFoobarTaskSucceeded) {
    console.log(
      `Robot "${event.data.robotId}" was assigned a new task after selling foobar`,
    );
  }

  // eslint-disable-next-line class-methods-use-this
  protected async onError(event: SellFoobarTaskSucceeded, error: Error) {
    console.log(
      `Failing to request a new task for robot "${event.data.robotId}"`,
    );
    console.error(error);
  }
}
