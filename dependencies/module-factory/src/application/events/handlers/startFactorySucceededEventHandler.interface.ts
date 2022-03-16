import { IntegrationEventHandler } from '^shared/application/events/integrationEventHandler.interface';
import type {
  InputPort,
  InputPortData,
} from '^shared/application/inputPort.interface';
import type { InputPortFactory } from '^shared/application/inputPortFactory.interface';
import type { UseCase } from '^shared/application/useCase';

import { StartFactorySucceeded } from '../startFactorySucceeded.event';

export abstract class StartFactorySucceededEventHandler<
  I extends InputPortData,
  U extends UseCase<InputPort<I>>,
> extends IntegrationEventHandler<StartFactorySucceeded, I, U> {
  constructor(
    inputPortFactory: InputPortFactory<InputPort<I>, StartFactorySucceeded>,
    useCase: U,
  ) {
    super(StartFactorySucceeded, inputPortFactory, useCase);
  }
}
