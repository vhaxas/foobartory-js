import { Nullable } from './types';

export class Result<E extends Error | null, T> {
  private constructor(
    readonly isOk: boolean,
    private readonly error?: Nullable<E>,
    private readonly value?: Nullable<T>,
  ) {
    Object.freeze(this);
  }

  static ok<U>(value: U): Result<null, U> {
    return new Result<null, U>(true, null, value);
  }

  static fail<Er extends Error>(error: Er): Result<Er, null> {
    return new Result<Er, null>(false, error, null);
  }

  getValue(): T {
    if (this.value === null || this.value === undefined) {
      throw new TypeError('No value defined');
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.value!;
  }

  getErrorValue(): E {
    if (this.error === null || this.error === undefined) {
      throw new TypeError('No error defined');
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.error!;
  }
}
