import { IntegrationEventHandler } from '^shared/application/events/integrationEventHandler.interface';
import type {
  InputPort,
  InputPortData,
} from '^shared/application/inputPort.interface';
import type { InputPortFactory } from '^shared/application/inputPortFactory.interface';
import type { UseCase } from '^shared/application/useCase';

import { BuyRobotTaskFailed } from '../buyRobotTaskFailed.event';

export abstract class BuyRobotTaskFailedEventHandler<
  I extends InputPortData,
  U extends UseCase<InputPort<I>>,
> extends IntegrationEventHandler<BuyRobotTaskFailed, I, U> {
  constructor(
    inputPortFactory: InputPortFactory<InputPort<I>, BuyRobotTaskFailed>,
    useCase: U,
  ) {
    super(BuyRobotTaskFailed, inputPortFactory, useCase);
  }
}
