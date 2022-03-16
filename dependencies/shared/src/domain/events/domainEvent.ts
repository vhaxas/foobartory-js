import { Event } from '../../core/event';
import { EventBase } from '../../core/event.interface';
import { EventType } from '../../core/eventType';
import { AggregateRoot } from '../aggregateRoot';
import type { IDomainEvent } from './domainEvent.interface';

@Event(EventType.DOMAIN, AggregateRoot)
export class DomainEvent extends EventBase<IDomainEvent> {}
