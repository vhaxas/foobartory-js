/* eslint-disable no-console */
import { StopFactoryAfterStartFactorySucceededEventHandler } from '../../../application/events/handlers/after_start_factory_succeeded/stopFactoryAfterStartFactorySucceededEventHandler.interface';
import type { StartFactorySucceeded } from '../../../application/events/startFactorySucceeded.event';

// eslint-disable-next-line max-len
export class StopFactoryAfterStartFactorySucceededExitEventHandler extends StopFactoryAfterStartFactorySucceededEventHandler {
  // eslint-disable-next-line max-len
  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars, no-unused-vars
  protected async onSuccess(event: StartFactorySucceeded) {
    process.exit(0);
  }

  // eslint-disable-next-line class-methods-use-this
  protected async onError(event: StartFactorySucceeded, error: Error) {
    console.error(error);
    process.exit(1);
  }
}
