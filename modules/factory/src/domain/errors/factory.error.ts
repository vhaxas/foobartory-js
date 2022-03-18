/* eslint-disable max-classes-per-file */
import { DomainError } from '^shared/domain/error';
import type { PositiveInteger } from '^shared/domain/value_objects/positiveInteger.valueObject';
import type { StrictlyPositiveInteger } from '^shared/domain/value_objects/strictlyPositiveInteger.valueObject';

export class FactoryDomainError extends DomainError {}

class InvalidNbRobotsFactoryDomainError extends FactoryDomainError {
  constructor(readonly nbRobots: PositiveInteger) {
    super('Invalid number of robots');
  }
}

class InvalidMaxNumberOfRobotsAllowedFactoryDomainError extends FactoryDomainError {
  constructor(readonly maxNumberOfRobotsAllowed: StrictlyPositiveInteger) {
    super('Invalid maximum number of robots allowed');
  }
}

class InvalidMoneyFactoryDomainError extends FactoryDomainError {
  constructor(readonly money: PositiveInteger) {
    super('Invalid money');
  }
}

class InvalidNbFoosFactoryDomainError extends FactoryDomainError {
  constructor(readonly nbFoos: PositiveInteger) {
    super('Invalid number of foos');
  }
}

class InvalidNbBarsFactoryDomainError extends FactoryDomainError {
  constructor(readonly nbBars: PositiveInteger) {
    super('Invalid number of bars');
  }
}

class InvalidNbFoobarsFactoryDomainError extends FactoryDomainError {
  constructor(readonly nbFoobars: PositiveInteger) {
    super('Invalid number of foobars');
  }
}

class InvalidNbTasksFactoryDomainError extends FactoryDomainError {
  constructor(readonly nbTasks: PositiveInteger) {
    super('Invalid number of tasks');
  }
}

export class FactoryDomainErrorFactory {
  static invalidNbRobots(nbRobots: PositiveInteger) {
    return new InvalidNbRobotsFactoryDomainError(nbRobots);
  }

  static invalidMaxNumberOfRobotsAllowed(
    maxNumberOfRobotsAllowed: StrictlyPositiveInteger,
  ) {
    return new InvalidMaxNumberOfRobotsAllowedFactoryDomainError(
      maxNumberOfRobotsAllowed,
    );
  }

  static invalidMoney(money: PositiveInteger) {
    return new InvalidMoneyFactoryDomainError(money);
  }

  static invalidNbFoos(nbFoos: PositiveInteger) {
    return new InvalidNbFoosFactoryDomainError(nbFoos);
  }

  static invalidNbBars(nbBars: PositiveInteger) {
    return new InvalidNbBarsFactoryDomainError(nbBars);
  }

  static invalidNbFoobars(nbFoobars: PositiveInteger) {
    return new InvalidNbFoobarsFactoryDomainError(nbFoobars);
  }

  static invalidNbTasks(nbTasks: PositiveInteger) {
    return new InvalidNbTasksFactoryDomainError(nbTasks);
  }
}

/* eslint-enable max-classes-per-file */
