export type Nullable<T> = T | null;
export type NullableOrUndefined<T> = Nullable<T> | undefined;
export type PromiseOr<T> = Promise<T> | T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Constructor<Result = any, Params extends any[] = any[]> = new (
  ...args: Params
) => Result;
export type AbstractConstructor<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Result = any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Params extends any[] = any[],
> = abstract new (...args: Params) => Result;
