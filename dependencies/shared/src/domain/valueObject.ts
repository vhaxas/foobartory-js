export abstract class ValueObject<T> {
  readonly value: T;

  readonly isValid: boolean;

  constructor(value: T) {
    this.value = value;
    this.isValid = this.validate();
    Object.freeze(this);
  }

  equals(vo?: ValueObject<T>): boolean {
    if (vo === null || vo === undefined) {
      return false;
    }
    if (vo.value === undefined) {
      return false;
    }
    return JSON.stringify(this.value) === JSON.stringify(vo.value);
  }

  // eslint-disable-next-line class-methods-use-this
  protected validate(): boolean {
    return true;
  }
}
