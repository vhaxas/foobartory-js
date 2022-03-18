import { IntegrationEventHandler } from '^shared/application/events/integrationEventHandler.interface';
import type {
  InputPort,
  InputPortData,
} from '^shared/application/inputPort.interface';
import type { InputPortFactory } from '^shared/application/inputPortFactory.interface';
import type { UseCase } from '^shared/application/useCase';

import { AssembleFoobarTaskFailed } from '../assembleFoobarTaskFailed.event';

export abstract class AssembleFoobarTaskFailedEventHandler<
  I extends InputPortData,
  U extends UseCase<InputPort<I>>,
> extends IntegrationEventHandler<AssembleFoobarTaskFailed, I, U> {
  constructor(
    inputPortFactory: InputPortFactory<InputPort<I>, AssembleFoobarTaskFailed>,
    useCase: U,
  ) {
    super(AssembleFoobarTaskFailed, inputPortFactory, useCase);
  }
}
