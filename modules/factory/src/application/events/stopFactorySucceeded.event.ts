import { IIntegrationEvent } from '^shared/application/events/integrationEvent.interface';
import type { IIntegrationEventData } from '^shared/application/events/integrationEvent.interface';
import type { Nullable } from '^shared/core/types';
import type { UniqueId } from '^shared/domain/uniqueId';

interface StopFactorySucceededEventData extends IIntegrationEventData {
  factoryId: string | number;
}

export class StopFactorySucceeded extends IIntegrationEvent<StopFactorySucceededEventData> {
  constructor(data: StopFactorySucceededEventData, id?: Nullable<UniqueId>) {
    super(StopFactorySucceeded.name, data, id);
  }
}
