import { IntegrationEventHandler } from '^shared/application/events/integrationEventHandler.interface';
import type {
  InputPort,
  InputPortData,
} from '^shared/application/inputPort.interface';
import type { InputPortFactory } from '^shared/application/inputPortFactory.interface';
import type { UseCase } from '^shared/application/useCase';

import { MineBarTaskSucceeded } from '../mineBarTaskSucceeded.event';

export abstract class MineBarTaskSucceededEventHandler<
  I extends InputPortData,
  U extends UseCase<InputPort<I>>,
> extends IntegrationEventHandler<MineBarTaskSucceeded, I, U> {
  constructor(
    inputPortFactory: InputPortFactory<InputPort<I>, MineBarTaskSucceeded>,
    useCase: U,
  ) {
    super(MineBarTaskSucceeded, inputPortFactory, useCase);
  }
}
