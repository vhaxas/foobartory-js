import {
  IIntegrationEvent,
  IIntegrationEventData,
} from '^shared/application/events/integrationEvent.interface';
import type { Nullable } from '^shared/core/types';
import type { UniqueId } from '^shared/domain/uniqueId';

interface BuyRobotTaskSucceededEventData extends IIntegrationEventData {
  factoryId: string | number;
  newRobotId: string | number;
  robotId?: string | number;
}

export class BuyRobotTaskSucceeded extends IIntegrationEvent<BuyRobotTaskSucceededEventData> {
  constructor(data: BuyRobotTaskSucceededEventData, id?: Nullable<UniqueId>) {
    super(BuyRobotTaskSucceeded.name, data, id);
  }
}
