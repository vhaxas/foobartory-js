import {
  IIntegrationEvent,
  IIntegrationEventData,
} from '^shared/application/events/integrationEvent.interface';
import type { Nullable } from '^shared/core/types';
import type { UniqueId } from '^shared/domain/uniqueId';

interface MineBarTaskFailedEventData extends IIntegrationEventData {
  factoryId: string | number;
  robotId?: string | number;
  taskId?: string | number;
}

export class MineBarTaskFailed extends IIntegrationEvent<MineBarTaskFailedEventData> {
  constructor(data: MineBarTaskFailedEventData, id?: Nullable<UniqueId>) {
    super(MineBarTaskFailed.name, data, id);
  }
}
