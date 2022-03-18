import { IntegrationEventHandler } from '^shared/application/events/integrationEventHandler.interface';
import type {
  InputPort,
  InputPortData,
} from '^shared/application/inputPort.interface';
import type { InputPortFactory } from '^shared/application/inputPortFactory.interface';
import type { UseCase } from '^shared/application/useCase';

import { MineFooTaskSucceeded } from '../mineFooTaskSucceeded.event';

export abstract class MineFooTaskSucceededEventHandler<
  I extends InputPortData,
  U extends UseCase<InputPort<I>>,
> extends IntegrationEventHandler<MineFooTaskSucceeded, I, U> {
  constructor(
    inputPortFactory: InputPortFactory<InputPort<I>, MineFooTaskSucceeded>,
    useCase: U,
  ) {
    super(MineFooTaskSucceeded, inputPortFactory, useCase);
  }
}
