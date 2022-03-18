/* eslint-disable no-console */
import type { AssembleFoobarTaskSucceeded } from '../../../application/events/assembleFoobarTaskSucceeded.event';
import { AssignTaskAfterAssembleFoobarTaskSucceededEventHandler } from '../../../application/events/handlers/after_assemble_foobar_task_succeeded/assignTaskAfterAssembleFoobarTaskSucceededEventHandler.interface';

// eslint-disable-next-line max-len
export class AssignTaskAfterAssembleFoobarTaskSucceededConsoleEventHandler extends AssignTaskAfterAssembleFoobarTaskSucceededEventHandler {
  // eslint-disable-next-line class-methods-use-this
  protected async onStart(event: AssembleFoobarTaskSucceeded) {
    console.log(
      `Robot "${event.data.robotId}" requested new task after assembling foobar`,
    );
  }

  // eslint-disable-next-line class-methods-use-this
  protected async onSuccess(event: AssembleFoobarTaskSucceeded) {
    console.log(
      `Robot "${event.data.robotId}" was assigned a new task after assembling foobar`,
    );
  }

  // eslint-disable-next-line class-methods-use-this
  protected async onError(event: AssembleFoobarTaskSucceeded, error: Error) {
    console.log(
      `Failing to request a new task for robot "${event.data.robotId}"`,
    );
    console.error(error);
  }
}
