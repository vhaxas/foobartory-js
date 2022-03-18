import { IntegrationEventHandler } from '^shared/application/events/integrationEventHandler.interface';
import type {
  InputPort,
  InputPortData,
} from '^shared/application/inputPort.interface';
import type { InputPortFactory } from '^shared/application/inputPortFactory.interface';
import type { UseCase } from '^shared/application/useCase';

import { MoveRobotToWorkstationFailed } from '../moveRobotToWorkstationFailed.event';

export abstract class MoveRobotToWorkstationFailedEventHandler<
  I extends InputPortData,
  U extends UseCase<InputPort<I>>,
> extends IntegrationEventHandler<MoveRobotToWorkstationFailed, I, U> {
  constructor(
    inputPortFactory: InputPortFactory<
    InputPort<I>,
    MoveRobotToWorkstationFailed
    >,
    useCase: U,
  ) {
    super(MoveRobotToWorkstationFailed, inputPortFactory, useCase);
  }
}
