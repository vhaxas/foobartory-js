import type { Right } from '^shared/core/either';
import type { Option } from '^shared/core/option';
import type { Result } from '^shared/core/result';
import { UniqueId } from '^shared/domain/uniqueId';
import { PositiveInteger } from '^shared/domain/value_objects/positiveInteger.valueObject';
import { StrictlyPositiveInteger } from '^shared/domain/value_objects/strictlyPositiveInteger.valueObject';
import { initEventHandlers } from '^shared/eventHandler.util';
import test from 'ava';

import type { BuyRobotTaskInput } from '../../../../src/application/ports/buyRobotTaskInputPort.interface';
import { BuyRobotTaskInputPort } from '../../../../src/application/ports/buyRobotTaskInputPort.interface';
import { BuyRobotTaskUseCase } from '../../../../src/application/use_cases/buyRobotTask.useCase';
import { FactoryFactory } from '../../../../src/domain/aggregates/factories/factory.factory';
import type { Factory } from '../../../../src/domain/aggregates/factory.aggregate';
import { FactoryRepository } from '../../../../src/domain/repositories/factory.repository';
import { ProxyFactoryDataStoreFactory } from '../../../../src/infrastructure/datastores/factories/proxyFactoryDataStore.factory';
import { InMemoryFactoryDataStore } from '../../../../src/infrastructure/datastores/inMemoryFactory.dataStore';

test('should manage to execute task in order to buy a new robot', async function (t) {
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
  await new BuyRobotTaskUseCase(factoryRepository).execute(
    new BuyRobotTaskInputPortImpl({ factoryId }),
  );

  // Assert
  const optionalFactoryEither = await factoryRepository.findById(
    UniqueId.fromUniqueString(factoryId),
  );
  t.true(optionalFactoryEither.isRight);
  const optionalFactory = (<Right<Option<Factory>>>optionalFactoryEither).value;
  t.true(optionalFactory.isPresent);
  const retrievedFactory = optionalFactory.get();
  t.is(retrievedFactory.getNumberOfRobots(), nbRobots + 1);
  t.is(retrievedFactory.getMoney(), 0);
  t.is(retrievedFactory.getNumberOfFoos(), 0);
});

const setup = () => {
  const factoryFactory = new FactoryFactory();
  const factoryRepository = new FactoryRepository(
    new ProxyFactoryDataStoreFactory(new InMemoryFactoryDataStore()),
  );
  initEventHandlers();
  return { factoryFactory, factoryRepository };
};

class BuyRobotTaskInputPortImpl implements BuyRobotTaskInputPort {
  constructor(readonly data: BuyRobotTaskInput) {}
}
