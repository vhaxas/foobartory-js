import type { UniqueId } from '^shared/domain/uniqueId';

import type { Factory } from '../aggregates/factory.aggregate';
import type { Robot } from '../entities/robot.entity';
import {
  IFactoryDomainEvent,
  IFactoryDomainEventData,
} from './factoryDomainEvent.interface';

interface EventData extends IFactoryDomainEventData {
  factory: Factory;
  robot: Robot;
}

export class RobotAddedFactoryDomainEvent extends IFactoryDomainEvent<EventData> {
  constructor(factory: Factory, robot: Robot) {
    super(RobotAddedFactoryDomainEvent.name, { factory, robot });
  }

  getAggregateId(): UniqueId {
    return this.data.factory.id;
  }
}
