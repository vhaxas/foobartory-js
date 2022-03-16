/* eslint-disable max-classes-per-file */
import { DomainFailureBase } from '^shared/domain/failure';

export abstract class FactoryFailure extends DomainFailureBase {}

export class UnexpectedFactoryFailure extends FactoryFailure {
  constructor(readonly error: Error) {
    super();
  }
}

/* eslint-enable max-classes-per-file */
