import type { UniqueId } from '^shared/domain/uniqueId';

import type { Factory } from '../aggregates/factory.aggregate';
import type { Foo } from '../entities/foo.entity';
import {
  IFactoryDomainEvent,
  IFactoryDomainEventData,
} from './factoryDomainEvent.interface';

interface EventData extends IFactoryDomainEventData {
  factory: Factory;
  foo: Foo;
}

export class FooAddedFactoryDomainEvent extends IFactoryDomainEvent<EventData> {
  constructor(factory: Factory, foo: Foo) {
    super(FooAddedFactoryDomainEvent.name, { factory, foo });
  }

  getAggregateId(): UniqueId {
    return this.data.factory.id;
  }
}
