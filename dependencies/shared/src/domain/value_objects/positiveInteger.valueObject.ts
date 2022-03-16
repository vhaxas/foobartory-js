import { ValueObject } from '../valueObject';

export class PositiveInteger extends ValueObject<number> {
  constructor(value?: number) {
    super(value || 0);
  }

  protected validate(): boolean {
    return Math.sign(this.value) !== -1;
  }
}
