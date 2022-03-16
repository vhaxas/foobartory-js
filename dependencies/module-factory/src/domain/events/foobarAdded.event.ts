import type { UniqueId } from '^shared/domain/uniqueId';

import type { Factory } from '../aggregates/factory.aggregate';
import type { Foobar } from '../entities/foobar.entity';
import {
  IFactoryDomainEvent,
  IFactoryDomainEventData,
} from './factoryDomainEvent.interface';

interface EventData extends IFactoryDomainEventData {
  factory: Factory;
  foobar: Foobar;
}

export class FoobarAddedFactoryDomainEvent extends IFactoryDomainEvent<EventData> {
  constructor(factory: Factory, foobar: Foobar) {
    super(FoobarAddedFactoryDomainEvent.name, { factory, foobar });
  }

  getAggregateId(): UniqueId {
    return this.data.foobar.id;
  }
}
