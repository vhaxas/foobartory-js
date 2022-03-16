import { IntegrationEventHandler } from '^shared/application/events/integrationEventHandler.interface';
import type {
  InputPort,
  InputPortData,
} from '^shared/application/inputPort.interface';
import type { InputPortFactory } from '^shared/application/inputPortFactory.interface';
import type { UseCase } from '^shared/application/useCase';

import { AssignTaskFailed } from '../assignTaskFailed.event';

export abstract class AssignTaskFailedEventHandler<
  I extends InputPortData,
  U extends UseCase<InputPort<I>>,
> extends IntegrationEventHandler<AssignTaskFailed, I, U> {
  constructor(
    inputPortFactory: InputPortFactory<InputPort<I>, AssignTaskFailed>,
    useCase: U,
  ) {
    super(AssignTaskFailed, inputPortFactory, useCase);
  }
}
