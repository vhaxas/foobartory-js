import { IntegrationEventHandler } from '^shared/application/events/integrationEventHandler.interface';
import type {
  InputPort,
  InputPortData,
} from '^shared/application/inputPort.interface';
import type { InputPortFactory } from '^shared/application/inputPortFactory.interface';
import type { UseCase } from '^shared/application/useCase';

import { SellFoobarTaskFailed } from '../sellFoobarTaskFailed.event';

export abstract class SellFoobarTaskFailedEventHandler<
  I extends InputPortData,
  U extends UseCase<InputPort<I>>,
> extends IntegrationEventHandler<SellFoobarTaskFailed, I, U> {
  constructor(
    inputPortFactory: InputPortFactory<InputPort<I>, SellFoobarTaskFailed>,
    useCase: U,
  ) {
    super(SellFoobarTaskFailed, inputPortFactory, useCase);
  }
}
