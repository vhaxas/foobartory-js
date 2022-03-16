/* eslint-disable no-console */
import type { BuyRobotTaskSucceeded } from '../../../application/events/buyRobotTaskSucceeded.event';
import { StopFactoryAfterBuyRobotTaskSucceededEventHandler } from '../../../application/events/handlers/after_buy_robot_task_succeeded/stopFactoryAfterBuyRobotTaskSucceededEventHandler.interface';

// eslint-disable-next-line max-len
export class StopFactoryAfterBuyRobotTaskSucceededExitEventHandler extends StopFactoryAfterBuyRobotTaskSucceededEventHandler {
  // eslint-disable-next-line max-len
  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars, no-unused-vars
  protected async onSuccess(event: BuyRobotTaskSucceeded) {
    process.exit(0);
  }

  // eslint-disable-next-line class-methods-use-this
  protected async onError(event: BuyRobotTaskSucceeded, error: Error) {
    console.error(error);
    process.exit(1);
  }
}
