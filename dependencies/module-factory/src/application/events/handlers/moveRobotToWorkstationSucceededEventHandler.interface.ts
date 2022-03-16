import { IntegrationEventHandler } from '^shared/application/events/integrationEventHandler.interface';
import type {
  InputPort,
  InputPortData,
} from '^shared/application/inputPort.interface';
import type { InputPortFactory } from '^shared/application/inputPortFactory.interface';
import type { UseCase } from '^shared/application/useCase';

import { MoveRobotToWorkstationSucceeded } from '../moveRobotToWorkstationSucceeded.event';

export abstract class MoveRobotToWorkstationSucceededEventHandler<
  I extends InputPortData,
  U extends UseCase<InputPort<I>>,
> extends IntegrationEventHandler<MoveRobotToWorkstationSucceeded, I, U> {
  constructor(
    inputPortFactory: InputPortFactory<
    InputPort<I>,
    MoveRobotToWorkstationSucceeded
    >,
    useCase: U,
  ) {
    super(MoveRobotToWorkstationSucceeded, inputPortFactory, useCase);
  }
}
