import type { UniqueId } from '^shared/domain/uniqueId';

import type { Factory } from '../aggregates/factory.aggregate';
import {
  IFactoryDomainEvent,
  IFactoryDomainEventData,
} from './factoryDomainEvent.interface';

interface EventData extends IFactoryDomainEventData {
  factory: Factory;
}

export class FactoryCreatedFactoryDomainEvent extends IFactoryDomainEvent<EventData> {
  constructor(factory: Factory) {
    super(FactoryCreatedFactoryDomainEvent.name, { factory });
  }

  getAggregateId(): UniqueId {
    return this.data.factory.id;
  }
}
