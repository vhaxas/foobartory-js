/* eslint-disable no-console */
import type { BuyRobotTaskFailed } from '../../../application/events/buyRobotTaskFailed.event';
import { AssignTaskAfterBuyRobotTaskFailedEventHandler } from '../../../application/events/handlers/after_buy_robot_task_failed/assignTaskAfterBuyRobotTaskFailedEventHandler.interface';

// eslint-disable-next-line max-len
export class AssignTaskAfterBuyRobotTaskFailedConsoleEventHandler extends AssignTaskAfterBuyRobotTaskFailedEventHandler {
  // eslint-disable-next-line class-methods-use-this
  protected async onStart(event: BuyRobotTaskFailed) {
    console.log(
      `Robot "${event.data.robotId}" requested new task after failing to buy robot`,
    );
  }

  // eslint-disable-next-line class-methods-use-this
  protected async onSuccess(event: BuyRobotTaskFailed) {
    console.log(
      `Robot "${event.data.robotId}" was assigned a new task after failing to buy robot`,
    );
  }

  // eslint-disable-next-line class-methods-use-this
  protected async onError(event: BuyRobotTaskFailed, error: Error) {
    console.log(
      `Failing to request a new task for robot "${event.data.robotId}"`,
    );
    console.error(error);
  }
}
