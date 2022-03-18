import type { UniqueId } from '^shared/domain/uniqueId';

import type { Factory } from '../aggregates/factory.aggregate';
import type { Bar } from '../entities/bar.entity';
import {
  IFactoryDomainEvent,
  IFactoryDomainEventData,
} from './factoryDomainEvent.interface';

interface EventData extends IFactoryDomainEventData {
  factory: Factory;
  bar: Bar;
}

export class BarAddedFactoryDomainEvent extends IFactoryDomainEvent<EventData> {
  constructor(factory: Factory, bar: Bar) {
    super(BarAddedFactoryDomainEvent.name, { factory, bar });
  }

  getAggregateId(): UniqueId {
    return this.data.factory.id;
  }
}
