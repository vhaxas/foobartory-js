import { IntegrationEventHandler } from '^shared/application/events/integrationEventHandler.interface';
import type {
  InputPort,
  InputPortData,
} from '^shared/application/inputPort.interface';
import type { InputPortFactory } from '^shared/application/inputPortFactory.interface';
import type { UseCase } from '^shared/application/useCase';

import { StartFactoryFailed } from '../startFactoryFailed.event';

export abstract class StartFactoryFailedEventHandler<
  I extends InputPortData,
  U extends UseCase<InputPort<I>>,
> extends IntegrationEventHandler<StartFactoryFailed, I, U> {
  constructor(
    inputPortFactory: InputPortFactory<InputPort<I>, StartFactoryFailed>,
    useCase: U,
  ) {
    super(StartFactoryFailed, inputPortFactory, useCase);
  }
}
