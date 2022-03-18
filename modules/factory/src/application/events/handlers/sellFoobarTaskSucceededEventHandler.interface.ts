import { IntegrationEventHandler } from '^shared/application/events/integrationEventHandler.interface';
import type {
  InputPort,
  InputPortData,
} from '^shared/application/inputPort.interface';
import type { InputPortFactory } from '^shared/application/inputPortFactory.interface';
import type { UseCase } from '^shared/application/useCase';

import { SellFoobarTaskSucceeded } from '../sellFoobarTaskSucceeded.event';

export abstract class SellFoobarTaskSucceededEventHandler<
  I extends InputPortData,
  U extends UseCase<InputPort<I>>,
> extends IntegrationEventHandler<SellFoobarTaskSucceeded, I, U> {
  constructor(
    inputPortFactory: InputPortFactory<InputPort<I>, SellFoobarTaskSucceeded>,
    useCase: U,
  ) {
    super(SellFoobarTaskSucceeded, inputPortFactory, useCase);
  }
}
