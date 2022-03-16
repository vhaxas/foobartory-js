import { IIntegrationEvent } from '^shared/application/events/integrationEvent.interface';
import type { IIntegrationEventData } from '^shared/application/events/integrationEvent.interface';
import type { Nullable } from '^shared/core/types';
import type { UniqueId } from '^shared/domain/uniqueId';

interface StartFactorySucceededEventData extends IIntegrationEventData {
  factoryId: string | number;
}

export class StartFactorySucceeded extends IIntegrationEvent<StartFactorySucceededEventData> {
  constructor(data: StartFactorySucceededEventData, id?: Nullable<UniqueId>) {
    super(StartFactorySucceeded.name, data, id);
  }
}
