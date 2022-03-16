/* eslint-disable no-console */
import type { BuyRobotTaskSucceeded } from '../../../application/events/buyRobotTaskSucceeded.event';
import { AssignTaskAfterBuyRobotTaskSucceededEventHandler } from '../../../application/events/handlers/after_buy_robot_task_succeeded/assignTaskAfterBuyRobotTaskSucceededEventHandler.interface';

// eslint-disable-next-line max-len
export class AssignTaskAfterBuyRobotTaskSucceededConsoleEventHandler extends AssignTaskAfterBuyRobotTaskSucceededEventHandler {
  // eslint-disable-next-line class-methods-use-this
  protected async onStart(event: BuyRobotTaskSucceeded) {
    console.log(
      `Robot "${event.data.robotId}" requested new task after buying robot`,
    );
  }

  // eslint-disable-next-line class-methods-use-this
  protected async onSuccess(event: BuyRobotTaskSucceeded) {
    console.log(
      `Robot "${event.data.robotId}" was assigned a new task after buying robot`,
    );
  }

  // eslint-disable-next-line class-methods-use-this
  protected async onError(event: BuyRobotTaskSucceeded, error: Error) {
    console.log(
      `Failing to request a new task for robot "${event.data.robotId}"`,
    );
    console.error(error);
  }
}
