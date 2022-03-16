import { IIntegrationEvent } from '^shared/application/events/integrationEvent.interface';
import type { IIntegrationEventData } from '^shared/application/events/integrationEvent.interface';
import type { Nullable } from '^shared/core/types';
import type { UniqueId } from '^shared/domain/uniqueId';

interface AssembleFoobarTaskSucceededEventData extends IIntegrationEventData {
  factoryId: string | number;
  foobarId: string | number;
  robotId?: string | number;
}

// eslint-disable-next-line max-len
export class AssembleFoobarTaskSucceeded extends IIntegrationEvent<AssembleFoobarTaskSucceededEventData> {
  constructor(
    data: AssembleFoobarTaskSucceededEventData,
    id?: Nullable<UniqueId>,
  ) {
    super(AssembleFoobarTaskSucceeded.name, data, id);
  }
}
