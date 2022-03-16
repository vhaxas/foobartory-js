/* eslint-disable no-console */
import { AssignTaskAfterSellFoobarTaskFailedEventHandler } from '../../../application/events/handlers/after_sell_foobar_task_failed/assignTaskAfterSellFoobarTaskFailedEventHandler.interface';
import type { SellFoobarTaskFailed } from '../../../application/events/sellFoobarTaskFailed.event';

// eslint-disable-next-line max-len
export class AssignTaskAfterSellFoobarTaskFailedConsoleEventHandler extends AssignTaskAfterSellFoobarTaskFailedEventHandler {
  // eslint-disable-next-line class-methods-use-this
  protected async onStart(event: SellFoobarTaskFailed) {
    console.log(
      `Robot "${event.data.robotId}" requested new task after failing to sell foobar`,
    );
  }

  // eslint-disable-next-line class-methods-use-this
  protected async onSuccess(event: SellFoobarTaskFailed) {
    console.log(
      `Robot "${event.data.robotId}" was assigned a new task after failing to sell foobar`,
    );
  }

  // eslint-disable-next-line class-methods-use-this
  protected async onError(event: SellFoobarTaskFailed, error: Error) {
    console.log(
      `Failing to request a new task for robot "${event.data.robotId}"`,
    );
    console.error(error);
  }
}
