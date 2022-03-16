import { IIntegrationEvent } from '^shared/application/events/integrationEvent.interface';
import type { Nullable } from '^shared/core/types';
import type { UniqueId } from '^shared/domain/uniqueId';

export class MoveRobotToWorkstationFailed extends IIntegrationEvent {
  constructor(id?: Nullable<UniqueId>) {
    super(MoveRobotToWorkstationFailed.name, {}, id);
  }
}
