import {
  IDomainEvent,
  IDomainEventData,
} from '^shared/domain/events/domainEvent.interface';

export interface IFactoryDomainEventData extends IDomainEventData {
  [x: string]: unknown;
}

export abstract class IFactoryDomainEvent<
  T extends IFactoryDomainEventData = Record<string, unknown>,
> extends IDomainEvent<T> {}
