import {
  IIntegrationEvent,
  IIntegrationEventData,
} from '^shared/application/events/integrationEvent.interface';
import type { Nullable } from '^shared/core/types';
import type { UniqueId } from '^shared/domain/uniqueId';

interface BuyRobotTaskFailedEventData extends IIntegrationEventData {
  factoryId: string | number;
  robotId?: string | number;
  taskId?: string | number;
}

export class BuyRobotTaskFailed extends IIntegrationEvent<BuyRobotTaskFailedEventData> {
  constructor(data: BuyRobotTaskFailedEventData, id?: Nullable<UniqueId>) {
    super(BuyRobotTaskFailed.name, data, id);
  }
}
