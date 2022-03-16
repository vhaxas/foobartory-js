import { PositiveInteger } from './positiveInteger.valueObject';

export class StrictlyPositiveInteger extends PositiveInteger {
  protected validate(): boolean {
    return super.validate() && this.value !== 0;
  }
}
