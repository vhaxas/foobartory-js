import { IIntegrationEvent } from '^shared/application/events/integrationEvent.interface';
import type { IIntegrationEventData } from '^shared/application/events/integrationEvent.interface';
import type { Nullable } from '^shared/core/types';
import type { UniqueId } from '^shared/domain/uniqueId';

interface AssignTaskSucceededEventData extends IIntegrationEventData {
  factoryId: string | number;
  robotId: string | number;
  taskId: string | number;
}

export class AssignTaskSucceeded extends IIntegrationEvent<AssignTaskSucceededEventData> {
  constructor(data: AssignTaskSucceededEventData, id?: Nullable<UniqueId>) {
    super(AssignTaskSucceeded.name, data, id);
  }
}
