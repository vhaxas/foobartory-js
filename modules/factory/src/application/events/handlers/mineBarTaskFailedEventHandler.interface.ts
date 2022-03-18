import { IntegrationEventHandler } from '^shared/application/events/integrationEventHandler.interface';
import type {
  InputPort,
  InputPortData,
} from '^shared/application/inputPort.interface';
import type { InputPortFactory } from '^shared/application/inputPortFactory.interface';
import type { UseCase } from '^shared/application/useCase';

import { MineBarTaskFailed } from '../mineBarTaskFailed.event';

export abstract class MineBarTaskFailedEventHandler<
  I extends InputPortData,
  U extends UseCase<InputPort<I>>,
> extends IntegrationEventHandler<MineBarTaskFailed, I, U> {
  constructor(
    inputPortFactory: InputPortFactory<InputPort<I>, MineBarTaskFailed>,
    useCase: U,
  ) {
    super(MineBarTaskFailed, inputPortFactory, useCase);
  }
}
