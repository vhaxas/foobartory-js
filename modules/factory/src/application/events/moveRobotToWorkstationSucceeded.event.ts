import { IIntegrationEvent } from '^shared/application/events/integrationEvent.interface';
import type { IIntegrationEventData } from '^shared/application/events/integrationEvent.interface';
import type { Nullable } from '^shared/core/types';
import type { UniqueId } from '^shared/domain/uniqueId';

interface MoveRobotToWorkstationSucceededEventData
  extends IIntegrationEventData {
  factoryId: string | number;
  robotId: string | number;
  taskId?: string | number;
}

// eslint-disable-next-line max-len
export class MoveRobotToWorkstationSucceeded extends IIntegrationEvent<MoveRobotToWorkstationSucceededEventData> {
  constructor(
    data: MoveRobotToWorkstationSucceededEventData,
    id?: Nullable<UniqueId>,
  ) {
    super(MoveRobotToWorkstationSucceeded.name, data, id);
  }
}
