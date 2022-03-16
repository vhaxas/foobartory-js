import type { Nullable } from '../../core/types';
import { UniqueId } from '../uniqueId';

export interface IDomainEventData {
  [x: string]: unknown;
}

export abstract class IDomainEvent<
  T extends IDomainEventData = Record<string, unknown>,
> {
  readonly id: UniqueId;

  readonly occuredAt: Date;

  constructor(
    readonly name: string,
    readonly data: T,
    id?: Nullable<UniqueId>,
  ) {
    this.id = id || new UniqueId();
    this.occuredAt = new Date();
  }

  abstract getAggregateId(): UniqueId;
}
