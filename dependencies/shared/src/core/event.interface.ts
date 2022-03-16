import type { UniqueId } from '../domain/uniqueId';

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
export abstract class EventBase<IEvent> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  static clear(): void {}

  static markForDispatch(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    obj: { readonly id: UniqueId },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
  ): void {}

  static register<T>(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    eventClassName: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    callback: (event: T) => void,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
  ): void {}

  // eslint-disable-next-line max-len
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars, no-unused-vars
  static dispatch(id: UniqueId): void {}
}
