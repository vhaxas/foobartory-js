import { IntegrationEventHandler } from '^shared/application/events/integrationEventHandler.interface';
import type {
  InputPort,
  InputPortData,
} from '^shared/application/inputPort.interface';
import type { InputPortFactory } from '^shared/application/inputPortFactory.interface';
import type { UseCase } from '^shared/application/useCase';

import { BuyRobotTaskSucceeded } from '../buyRobotTaskSucceeded.event';

export abstract class BuyRobotTaskSucceededEventHandler<
  I extends InputPortData,
  U extends UseCase<InputPort<I>>,
> extends IntegrationEventHandler<BuyRobotTaskSucceeded, I, U> {
  constructor(
    inputPortFactory: InputPortFactory<InputPort<I>, BuyRobotTaskSucceeded>,
    useCase: U,
  ) {
    super(BuyRobotTaskSucceeded, inputPortFactory, useCase);
  }
}
