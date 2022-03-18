import { IIntegrationEvent } from '^shared/application/events/integrationEvent.interface';
import type { IIntegrationEventData } from '^shared/application/events/integrationEvent.interface';
import type { Nullable } from '^shared/core/types';
import type { UniqueId } from '^shared/domain/uniqueId';

interface SellFoobarTaskSucceededEventData extends IIntegrationEventData {
  factoryId: string | number;
  foobarIds: (string | number)[];
  robotId?: string | number;
}

export class SellFoobarTaskSucceeded extends IIntegrationEvent<SellFoobarTaskSucceededEventData> {
  constructor(data: SellFoobarTaskSucceededEventData, id?: Nullable<UniqueId>) {
    super(SellFoobarTaskSucceeded.name, data, id);
  }
}
