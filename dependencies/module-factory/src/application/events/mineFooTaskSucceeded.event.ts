import { IIntegrationEvent } from '^shared/application/events/integrationEvent.interface';
import type { IIntegrationEventData } from '^shared/application/events/integrationEvent.interface';
import type { Nullable } from '^shared/core/types';
import type { UniqueId } from '^shared/domain/uniqueId';

interface MineFooTaskSucceededEventData extends IIntegrationEventData {
  factoryId: string | number;
  fooId: string | number;
  robotId?: string | number;
}

export class MineFooTaskSucceeded extends IIntegrationEvent<MineFooTaskSucceededEventData> {
  constructor(data: MineFooTaskSucceededEventData, id?: Nullable<UniqueId>) {
    super(MineFooTaskSucceeded.name, data, id);
  }
}
