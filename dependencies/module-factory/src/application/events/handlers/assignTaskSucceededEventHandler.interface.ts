import { IntegrationEventHandler } from '^shared/application/events/integrationEventHandler.interface';
import type {
  InputPort,
  InputPortData,
} from '^shared/application/inputPort.interface';
import type { InputPortFactory } from '^shared/application/inputPortFactory.interface';
import type { UseCase } from '^shared/application/useCase';

import { AssignTaskSucceeded } from '../assignTaskSucceeded.event';

export abstract class AssignTaskSucceededEventHandler<
  I extends InputPortData,
  U extends UseCase<InputPort<I>>,
> extends IntegrationEventHandler<AssignTaskSucceeded, I, U> {
  constructor(
    inputPortFactory: InputPortFactory<InputPort<I>, AssignTaskSucceeded>,
    useCase: U,
  ) {
    super(AssignTaskSucceeded, inputPortFactory, useCase);
  }
}
