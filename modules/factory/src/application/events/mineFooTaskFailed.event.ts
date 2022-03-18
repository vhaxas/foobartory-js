import {
  IIntegrationEvent,
  IIntegrationEventData,
} from '^shared/application/events/integrationEvent.interface';
import type { Nullable } from '^shared/core/types';
import type { UniqueId } from '^shared/domain/uniqueId';

interface MineFooTaskFailedEventData extends IIntegrationEventData {
  factoryId: string | number;
  robotId?: string | number;
  taskId?: string | number;
}

export class MineFooTaskFailed extends IIntegrationEvent<MineFooTaskFailedEventData> {
  constructor(data: MineFooTaskFailedEventData, id?: Nullable<UniqueId>) {
    super(MineFooTaskFailed.name, data, id);
  }
}
