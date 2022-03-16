import type { PromiseOr } from '../core/types';
import type { AppErrorBase } from './error';

interface BaseOutputPort<E extends AppErrorBase> {
  handleError(error: E): PromiseOr<void>;
}

export interface OutputPortData {
  [x: string]: unknown;
}

export interface OutputPort<
  E extends AppErrorBase = AppErrorBase,
  T extends OutputPortData = Record<string, unknown>,
> extends BaseOutputPort<E> {
  handle(data: T): PromiseOr<void>;
}

export interface EmptyOutputPort<E extends AppErrorBase = AppErrorBase>
  extends BaseOutputPort<E> {
  handle(): PromiseOr<void>;
}
