import { IntegrationEventHandler } from '^shared/application/events/integrationEventHandler.interface';
import type {
  InputPort,
  InputPortData,
} from '^shared/application/inputPort.interface';
import type { InputPortFactory } from '^shared/application/inputPortFactory.interface';
import type { UseCase } from '^shared/application/useCase';

import { AssembleFoobarTaskSucceeded } from '../assembleFoobarTaskSucceeded.event';

export abstract class AssembleFoobarTaskSucceededEventHandler<
  I extends InputPortData,
  U extends UseCase<InputPort<I>>,
> extends IntegrationEventHandler<AssembleFoobarTaskSucceeded, I, U> {
  constructor(
    inputPortFactory: InputPortFactory<
    InputPort<I>,
    AssembleFoobarTaskSucceeded
    >,
    useCase: U,
  ) {
    super(AssembleFoobarTaskSucceeded, inputPortFactory, useCase);
  }
}
