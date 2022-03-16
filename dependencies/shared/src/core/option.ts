/* eslint-disable max-classes-per-file */
export abstract class Option<T> {
  static of<U>(data: U): Option<U> {
    // eslint-disable-next-line no-use-before-define
    return new PresentOption<U>(data);
  }

  static ofNullable<U>(data?: U | null): Option<U> {
    if (!(data === null || data === undefined)) {
      // eslint-disable-next-line no-use-before-define
      return new PresentOption<U>(data);
    }
    // eslint-disable-next-line no-use-before-define
    return new EmptyOption<U>();
  }

  static empty<U>(): Option<U> {
    // eslint-disable-next-line no-use-before-define
    return new EmptyOption<U>();
  }

  abstract get isPresent(): boolean;

  abstract get(): T;
}

export class PresentOption<T> extends Option<T> {
  constructor(private readonly data: T) {
    super();
  }

  // eslint-disable-next-line class-methods-use-this
  get isPresent(): true {
    return true;
  }

  get(): T {
    return this.data;
  }
}

export class EmptyOption<T> extends Option<T> {
  // eslint-disable-next-line class-methods-use-this
  get isPresent(): false {
    return false;
  }

  // eslint-disable-next-line class-methods-use-this
  get(): T {
    throw new TypeError('The option is empty.');
  }
}

/* eslint-enable max-classes-per-file */
