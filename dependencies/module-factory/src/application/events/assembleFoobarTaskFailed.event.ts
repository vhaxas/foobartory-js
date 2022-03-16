import {
  IIntegrationEvent,
  IIntegrationEventData,
} from '^shared/application/events/integrationEvent.interface';
import type { Nullable } from '^shared/core/types';
import type { UniqueId } from '^shared/domain/uniqueId';

interface AssembleFoobarTaskFailedEventData extends IIntegrationEventData {
  factoryId: string | number;
  robotId?: string | number;
  taskId?: string | number;
}

export class AssembleFoobarTaskFailed extends IIntegrationEvent<AssembleFoobarTaskFailedEventData> {
  constructor(
    data: AssembleFoobarTaskFailedEventData,
    id?: Nullable<UniqueId>,
  ) {
    super(AssembleFoobarTaskFailed.name, data, id);
  }
}
