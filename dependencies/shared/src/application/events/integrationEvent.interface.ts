import type { Nullable } from '../../core/types';
import { UniqueId } from '../../domain/uniqueId';

export interface IIntegrationEventData {
  [x: string]: unknown;
}

export abstract class IIntegrationEvent<
  T extends IIntegrationEventData = Record<string, unknown>,
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
}
