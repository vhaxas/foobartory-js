import { UnexpectedFactoryFailure } from './factory.failure';

export abstract class FactoryFailureFactory {
  static unexpected(error: Error) {
    return new UnexpectedFactoryFailure(error);
  }
}
