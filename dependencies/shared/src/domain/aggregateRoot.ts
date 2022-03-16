import { Entity } from './entity';
import { DomainEvent } from './events/domainEvent';
import type { IDomainEvent } from './events/domainEvent.interface';

export abstract class AggregateRoot<
  T = Record<string, unknown>,
> extends Entity<T> {
  protected events: IDomainEvent[] = [];

  getEvents(): IDomainEvent[] {
    return this.events;
  }

  clearEvents(): void {
    this.events.splice(0, this.events.length);
  }

  addDomainEvent(domainEvent: IDomainEvent): void {
    this.events.push(domainEvent);
    DomainEvent.markForDispatch(this);
    // this.logDomainEventAdded(domainEvent);
  }

  private logDomainEventAdded(domainEvent: IDomainEvent): void {
    const thisClass = Reflect.getPrototypeOf(this);
    const domainEventClass = Reflect.getPrototypeOf(domainEvent);
    if (thisClass !== null && domainEventClass !== null) {
      console.info(
        '[Domain Event Created]',
        thisClass.constructor.name,
        '==>',
        domainEventClass.constructor.name,
      );
    }
  }
}
