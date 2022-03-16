import { IntegrationEventHandler } from '^shared/application/events/integrationEventHandler.interface';
import type {
  InputPort,
  InputPortData,
} from '^shared/application/inputPort.interface';
import type { InputPortFactory } from '^shared/application/inputPortFactory.interface';
import type { UseCase } from '^shared/application/useCase';

import { MineFooTaskFailed } from '../mineFooTaskFailed.event';

export abstract class MineFooTaskFailedEventHandler<
  I extends InputPortData,
  U extends UseCase<InputPort<I>>,
> extends IntegrationEventHandler<MineFooTaskFailed, I, U> {
  constructor(
    inputPortFactory: InputPortFactory<InputPort<I>, MineFooTaskFailed>,
    useCase: U,
  ) {
    super(MineFooTaskFailed, inputPortFactory, useCase);
  }
}
