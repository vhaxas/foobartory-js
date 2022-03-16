/* eslint-disable no-console */
import { AssignTaskAfterStartFactorySucceededEventHandler } from '../../../application/events/handlers/after_start_factory_succeeded/assignTaskAfterStartFactorySucceededEventHandler.interface';
import type { StartFactorySucceeded } from '../../../application/events/startFactorySucceeded.event';

// eslint-disable-next-line max-len
export class AssignTaskAfterStartFactorySucceededConsoleEventHandler extends AssignTaskAfterStartFactorySucceededEventHandler {
  // eslint-disable-next-line class-methods-use-this
  protected async onStart(event: StartFactorySucceeded) {
    console.log(`Factory "${event.data.factoryId}" starts to assign new tasks`);
  }

  // eslint-disable-next-line class-methods-use-this
  protected async onSuccess(event: StartFactorySucceeded) {
    console.log(`Factory "${event.data.factoryId}" is assigning new tasks`);
  }

  // eslint-disable-next-line class-methods-use-this
  protected async onError(event: StartFactorySucceeded, error: Error) {
    console.log(
      `Factory "${event.data.factoryId}" has failed to assign new tasks`,
    );
    console.error(error);
  }
}
