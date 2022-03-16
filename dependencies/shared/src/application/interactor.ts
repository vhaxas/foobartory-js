import type { Nullable } from '../core/types';
import { UniqueId } from '../domain/uniqueId';
import type { AppErrorBase } from './error';
import type { InputPort } from './inputPort.interface';
import type { OutputPort } from './outputPort.interface';
import { UseCase } from './useCase';

export abstract class Interactor<
  I extends InputPort = InputPort<Record<string, unknown>>,
  O extends OutputPort = OutputPort<AppErrorBase, Record<string, unknown>>,
> extends UseCase<I> {
  constructor(protected readonly outputPort: O, id?: Nullable<UniqueId>) {
    super(id);
  }
}
