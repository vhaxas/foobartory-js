export interface InputPortData {
  [x: string]: unknown;
}

export interface InputPort<T extends InputPortData = Record<string, unknown>> {
  readonly data: T;
}
