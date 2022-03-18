/* eslint-disable no-console */
import type { AssembleFoobarTaskFailed } from '../../../application/events/assembleFoobarTaskFailed.event';
import { AssignTaskAfterAssembleFoobarTaskFailedEventHandler } from '../../../application/events/handlers/after_assemble_foobar_task_failed/assignTaskAfterAssembleFoobarTaskFailedEventHandler.interface';

// eslint-disable-next-line max-len
export class AssignTaskAfterAssembleFoobarTaskFailedConsoleEventHandler extends AssignTaskAfterAssembleFoobarTaskFailedEventHandler {
  // eslint-disable-next-line class-methods-use-this
  protected async onStart(event: AssembleFoobarTaskFailed) {
    console.log(
      `Robot "${event.data.robotId}" requested new task after failing to assemble foobar`,
    );
  }

  // eslint-disable-next-line class-methods-use-this
  protected async onSuccess(event: AssembleFoobarTaskFailed) {
    console.log(
      `Robot "${event.data.robotId}" was assigned a new task after failing to assemble foobar`,
    );
  }

  // eslint-disable-next-line class-methods-use-this
  protected async onError(event: AssembleFoobarTaskFailed, error: Error) {
    console.log(
      `Failing to request a new task for robot "${event.data.robotId}"`,
    );
    console.error(error);
  }
}
