import type { Right } from '^shared/core/either';
import type { Option } from '^shared/core/option';
import type { Result } from '^shared/core/result';
import { UniqueId } from '^shared/domain/uniqueId';
import { PositiveInteger } from '^shared/domain/value_objects/positiveInteger.valueObject';
import { StrictlyPositiveInteger } from '^shared/domain/value_objects/strictlyPositiveInteger.valueObject';
import { initEventHandlers } from '^shared/eventHandler.util';
import { LuckyGambler, UnluckyGambler } from '^shared/random.util';
import test from 'ava';

import type { AssembleFoobarTaskInput } from '../../../../src/application/ports/assembleFoobarTaskInputPort.interface';
import { AssembleFoobarTaskInputPort } from '../../../../src/application/ports/assembleFoobarTaskInputPort.interface';
import { AssembleFoobarTaskUseCase } from '../../../../src/application/use_cases/assembleFoobarTask.useCase';
import { FactoryFactory } from '../../../../src/domain/aggregates/factories/factory.factory';
import type { Factory } from '../../../../src/domain/aggregates/factory.aggregate';
import { FactoryRepository } from '../../../../src/domain/repositories/factory.repository';
import { ProxyFactoryDataStoreFactory } from '../../../../src/infrastructure/datastores/factories/proxyFactoryDataStore.factory';
import { InMemoryFactoryDataStore } from '../../../../src/infrastructure/datastores/inMemoryFactory.dataStore';

test('should manage to execute task in order to assemble foobars when lucky', async function (t) {
  // Arrange
  const { factoryFactory, factoryRepository, luckyGambler } = setup();
  const factoryId = 'abc';
  const nbRobots = 2;
  const maxNumberOfRobotsAllowed = 30;
  const nbFoos = 1;
  const nbBars = 1;
  const nbFoobars = 0;
  const factoryResult = await factoryFactory.create(
    {
      nbRobots: new PositiveInteger(nbRobots),
      maxNumberOfRobotsAllowed: new StrictlyPositiveInteger(
        maxNumberOfRobotsAllowed,
      ),
      nbFoos: new PositiveInteger(nbFoos),
      nbBars: new PositiveInteger(nbBars),
      nbFoobars: new PositiveInteger(nbFoobars),
    },
    UniqueId.fromUniqueString(factoryId),
  );
  t.true(factoryResult.isOk);
  const factory = (<Result<null, Factory>>factoryResult).getValue();
  await factoryRepository.add(factory);
  const repositoryContainsFactoryEither = await factoryRepository.contains(
    factory,
  );
  t.true(repositoryContainsFactoryEither.isRight);
  const repositoryContainsFactory = (<Right<boolean>>(
    repositoryContainsFactoryEither
  )).value;
  t.true(repositoryContainsFactory);

  // Act
  await new AssembleFoobarTaskUseCase(factoryRepository, {
    gambler: luckyGambler,
  }).execute(new AssembleFoobarTaskInputPortImpl({ factoryId }));

  // Assert
  const optionalFactoryEither = await factoryRepository.findById(
    UniqueId.fromUniqueString(factoryId),
  );
  t.true(optionalFactoryEither.isRight);
  const optionalFactory = (<Right<Option<Factory>>>optionalFactoryEither).value;
  t.true(optionalFactory.isPresent);
  const retrievedFactory = optionalFactory.get();
  t.is(retrievedFactory.getNumberOfFoos(), 0);
  t.is(retrievedFactory.getNumberOfBars(), 0);
  t.is(retrievedFactory.getNumberOfFoobars(), 1);
});

test('should manage to execute task in order to assemble foobars when unlucky', async function (t) {
  // Arrange
  const {
    factoryFactory,
    factoryRepository,
    unluckyGambler: gambler,
  } = setup();
  const factoryId = 'abc';
  const nbRobots = 2;
  const maxNumberOfRobotsAllowed = 30;
  const nbFoos = 1;
  const nbBars = 1;
  const nbFoobars = 0;
  const factoryResult = await factoryFactory.create(
    {
      nbRobots: new PositiveInteger(nbRobots),
      maxNumberOfRobotsAllowed: new StrictlyPositiveInteger(
        maxNumberOfRobotsAllowed,
      ),
      nbFoos: new PositiveInteger(nbFoos),
      nbBars: new PositiveInteger(nbBars),
      nbFoobars: new PositiveInteger(nbFoobars),
    },
    UniqueId.fromUniqueString(factoryId),
  );
  t.true(factoryResult.isOk);
  const factory = (<Result<null, Factory>>factoryResult).getValue();
  await factoryRepository.add(factory);
  const repositoryContainsFactoryEither = await factoryRepository.contains(
    factory,
  );
  t.true(repositoryContainsFactoryEither.isRight);
  const repositoryContainsFactory = (<Right<boolean>>(
    repositoryContainsFactoryEither
  )).value;
  t.true(repositoryContainsFactory);

  // Act
  await new AssembleFoobarTaskUseCase(factoryRepository, { gambler }).execute(
    new AssembleFoobarTaskInputPortImpl({ factoryId }),
  );

  // Assert
  const optionalFactoryEither = await factoryRepository.findById(
    UniqueId.fromUniqueString(factoryId),
  );
  t.true(optionalFactoryEither.isRight);
  const optionalFactory = (<Right<Option<Factory>>>optionalFactoryEither).value;
  t.true(optionalFactory.isPresent);
  const retrievedFactory = optionalFactory.get();
  t.is(retrievedFactory.getNumberOfFoos(), 0);
  t.is(retrievedFactory.getNumberOfBars(), 1);
  t.is(retrievedFactory.getNumberOfFoobars(), 0);
});

const setup = () => {
  const factoryFactory = new FactoryFactory();
  const factoryRepository = new FactoryRepository(
    new ProxyFactoryDataStoreFactory(new InMemoryFactoryDataStore()),
  );
  initEventHandlers();
  return {
    factoryFactory,
    factoryRepository,
    luckyGambler: new LuckyGambler(),
    unluckyGambler: new UnluckyGambler(),
  };
};

class AssembleFoobarTaskInputPortImpl implements AssembleFoobarTaskInputPort {
  constructor(readonly data: AssembleFoobarTaskInput) {}
}
