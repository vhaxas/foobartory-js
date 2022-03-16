import type { UniqueId } from '^shared/domain/uniqueId';

import type { Factory } from '../aggregates/factory.aggregate';
import type { Task } from '../entities/task.entity';
import {
  IFactoryDomainEvent,
  IFactoryDomainEventData,
} from './factoryDomainEvent.interface';

interface EventData extends IFactoryDomainEventData {
  factory: Factory;
  task: Task;
}

export class TaskAddedFactoryDomainEvent extends IFactoryDomainEvent<EventData> {
  constructor(factory: Factory, task: Task) {
    super(TaskAddedFactoryDomainEvent.name, { factory, task });
  }

  getAggregateId(): UniqueId {
    return this.data.factory.id;
  }
}
