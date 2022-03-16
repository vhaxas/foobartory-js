/* eslint-disable max-classes-per-file */
export abstract class DomainFailureBase {
  // eslint-disable-next-line no-useless-constructor, no-empty-function
  constructor(protected readonly error?: Error) {}
}

class ServerErrorDomainFailure extends DomainFailureBase {}

export abstract class DomainFailure {
  static serverError(error: Error): ServerErrorDomainFailure {
    return new ServerErrorDomainFailure(error);
  }
}

/* eslint-enable max-classes-per-file */
