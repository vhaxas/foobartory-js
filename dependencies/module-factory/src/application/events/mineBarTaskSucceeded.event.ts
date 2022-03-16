import { IIntegrationEvent } from '^shared/application/events/integrationEvent.interface';
import type { IIntegrationEventData } from '^shared/application/events/integrationEvent.interface';
import type { Nullable } from '^shared/core/types';
import type { UniqueId } from '^shared/domain/uniqueId';

interface MineBarTaskSucceededEventData extends IIntegrationEventData {
  factoryId: string | number;
  barId: string | number;
  robotId?: string | number;
}

export class MineBarTaskSucceeded extends IIntegrationEvent<MineBarTaskSucceededEventData> {
  constructor(data: MineBarTaskSucceededEventData, id?: Nullable<UniqueId>) {
    super(MineBarTaskSucceeded.name, data, id);
  }
}
