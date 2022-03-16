import { Nullable } from '../core/types';

export class Identifier<T = unknown> {
  // eslint-disable-next-line no-empty-function, no-useless-constructor
  constructor(private readonly value: T) {}

  equals(id?: Nullable<Identifier<T>>): boolean {
    if (id === null || id === undefined) {
      return false;
    }
    if (!(id instanceof this.constructor)) {
      return false;
    }
    return id.toValue() === this.value;
  }

  toString() {
    return String(this.value);
  }

  toValue(): T {
    return this.value;
  }
}
