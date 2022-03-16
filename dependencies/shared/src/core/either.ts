/* eslint-disable max-classes-per-file */
export abstract class Either<L, R> {
  // eslint-disable-next-line no-empty-function, no-useless-constructor, no-shadow
  constructor(protected readonly left: L, protected readonly right: R) {}

  abstract get value(): L | R;

  abstract get isLeft(): boolean;

  abstract get isRight(): boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class Left<T> extends Either<T, any> {
  constructor(err: T) {
    super(err, null);
  }

  get value(): T {
    return this.left;
  }

  // eslint-disable-next-line class-methods-use-this
  get isLeft(): true {
    return true;
  }

  // eslint-disable-next-line class-methods-use-this
  get isRight(): false {
    return false;
  }
}

export function left<T>(err: T): Left<T> {
  return new Left(err);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class Right<T> extends Either<any, T> {
  constructor(value: T) {
    super(null, value);
  }

  get value(): T {
    return this.right;
  }

  // eslint-disable-next-line class-methods-use-this
  get isLeft(): false {
    return false;
  }

  // eslint-disable-next-line class-methods-use-this
  get isRight(): true {
    return true;
  }
}

export function right<T>(value: T): Right<T> {
  return new Right(value);
}

/* eslint-enable max-classes-per-file */
