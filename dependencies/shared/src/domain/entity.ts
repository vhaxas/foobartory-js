import type { Nullable } from '../core/types';
import { UniqueId } from './uniqueId';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export abstract class Entity<T = any> {
  readonly id: UniqueId;

  constructor(protected readonly props: T, id?: Nullable<UniqueId>) {
    this.id = id || new UniqueId();
  }

  public equals(object?: Nullable<Entity<T>>): boolean {
    if (object === null || object === undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!(object instanceof Entity)) {
      return false;
    }

    return this.hasId(object.id);
  }

  hasId(id: UniqueId): boolean {
    return this.id.equals(id);
  }
}
