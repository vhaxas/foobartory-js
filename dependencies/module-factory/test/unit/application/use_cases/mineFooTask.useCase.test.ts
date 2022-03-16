import type { Right } from '^shared/core/either';
import type { Option } from '^shared/core/option';
import type { Result } from '^shared/core/result';
import { UniqueId } from '^shared/domain/uniqueId';
import { PositiveInteger } from '^shared/domain/value_objects/positiveInteger.valueObject';
import { StrictlyPositiveInteger } from '^shared/domain/value_objects/strictlyPositiveInteger.valueObject';
import { initEventHandlers } from '^shared/eventHandler.util';
import type { Randomizer } from '^shared/random.util';
import test from 'ava';

import type { MineFooTaskInput } from '../../../../src/application/ports/mineFooTaskInputPort.interface';
import { MineFooTaskInputPort } from '../../../../src/application/ports/mineFooTaskInputPort.interface';
import { MineFooTaskUseCase } from '../../../../src/application/use_cases/mineFooTask.useCase';
import { FactoryFactory } from '../../../../src/domain/aggregates/factories/factory.factory';
import type { Factory } from '../../../../src/domain/aggregates/factory.aggregate';
import { FactoryRepository } from '../../../../src/domain/repositories/factory.repository';
import { ProxyFactoryDataStoreFactory } from '../../../../src/infrastructure/datastores/factories/proxyFactoryDataStore.factory';
import { InMemoryFactoryDataStore } from '../../../../src/infrastructure/datastores/inMemoryFactory.dataStore';

test('should manage to execute task in order to mine foo', async function (t) {
  // Arrange
  const { factoryFactory, factoryRepository } = setup();
  const factoryId = 'abc';
  const nbRobots = 2;
  const maxNumberOfRobotsAllowed = 30;
  const money = 3;
  const nbFoos = 6;
  const factoryResult = await factoryFactory.create(
    {
      nbRobots: new PositiveInteger(nbRobots),
      maxNumberOfRobotsAllowed: new StrictlyPositiveInteger(
        maxNumberOfRobotsAllowed,
      ),
      money: new PositiveInteger(money),
      nbFoos: new PositiveInteger(nbFoos),
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
  await new MineFooTaskUseCase(factoryRepository).execute(
    new MineFooTaskInputPortImpl({ factoryId }),
  );

  // Assert
  const optionalFactoryEither = await factoryRepository.findById(
    UniqueId.fromUniqueString(factoryId),
  );
  t.true(optionalFactoryEither.isRight);
  const optionalFactory = (<Right<Option<Factory>>>optionalFactoryEither).value;
  t.true(optionalFactory.isPresent);
  const retrievedFactory = optionalFactory.get();
  t.is(retrievedFactory.getNumberOfFoos(), nbFoos + 1);
});

const setup = ({ randomizer }: { randomizer?: Randomizer } = {}) => {
  const factoryFactory = new FactoryFactory();
  const factoryRepository = new FactoryRepository(
    new ProxyFactoryDataStoreFactory(new InMemoryFactoryDataStore()),
  );
  initEventHandlers();
  return { factoryFactory, factoryRepository, randomizer };
};

class MineFooTaskInputPortImpl implements MineFooTaskInputPort {
  constructor(readonly data: MineFooTaskInput) {}
}
