import type { Right } from '^shared/core/either';
import type { Option } from '^shared/core/option';
import type { Result } from '^shared/core/result';
import { UniqueId } from '^shared/domain/uniqueId';
import { PositiveInteger } from '^shared/domain/value_objects/positiveInteger.valueObject';
import { StrictlyPositiveInteger } from '^shared/domain/value_objects/strictlyPositiveInteger.valueObject';
import { initEventHandlers } from '^shared/eventHandler.util';
import type { DiceRoller } from '^shared/random.util';
import { DeterministicDiceRoller } from '^shared/random.util';
import test from 'ava';

import type { SellFoobarTaskInput } from '../../../../src/application/ports/sellFoobarTaskInputPort.interface';
import { SellFoobarTaskInputPort } from '../../../../src/application/ports/sellFoobarTaskInputPort.interface';
import { SellFoobarTaskUseCase } from '../../../../src/application/use_cases/sellFoobarTask.useCase';
import { FactoryFactory } from '../../../../src/domain/aggregates/factories/factory.factory';
import type { Factory } from '../../../../src/domain/aggregates/factory.aggregate';
import { FactoryRepository } from '../../../../src/domain/repositories/factory.repository';
import { ProxyFactoryDataStoreFactory } from '../../../../src/infrastructure/datastores/factories/proxyFactoryDataStore.factory';
import { InMemoryFactoryDataStore } from '../../../../src/infrastructure/datastores/inMemoryFactory.dataStore';

test('should manage to execute task in order to sell foobars', async function (t) {
  // Arrange
  const { factoryFactory, factoryRepository, diceRoller } = setup({
    diceRoller: new DeterministicDiceRoller(1),
  });
  const factoryId = 'abc';
  const nbRobots = 2;
  const maxNumberOfRobotsAllowed = 30;
  const money = 3;
  const nbFoobars = 1;
  const factoryResult = await factoryFactory.create(
    {
      nbRobots: new PositiveInteger(nbRobots),
      maxNumberOfRobotsAllowed: new StrictlyPositiveInteger(
        maxNumberOfRobotsAllowed,
      ),
      money: new PositiveInteger(money),
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
  await new SellFoobarTaskUseCase(factoryRepository, { diceRoller }).execute(
    new SellFoobarTaskInputPortImpl({ factoryId }),
  );

  // Assert
  const optionalFactoryEither = await factoryRepository.findById(
    UniqueId.fromUniqueString(factoryId),
  );
  t.true(optionalFactoryEither.isRight);
  const optionalFactory = (<Right<Option<Factory>>>optionalFactoryEither).value;
  t.true(optionalFactory.isPresent);
  const retrievedFactory = optionalFactory.get();
  t.is(retrievedFactory.getMoney(), 4);
  t.is(retrievedFactory.getNumberOfFoobars(), 0);
});

const setup = ({ diceRoller }: { diceRoller?: DiceRoller } = {}) => {
  const factoryFactory = new FactoryFactory();
  const factoryRepository = new FactoryRepository(
    new ProxyFactoryDataStoreFactory(new InMemoryFactoryDataStore()),
  );
  initEventHandlers();
  return { factoryFactory, factoryRepository, diceRoller };
};

class SellFoobarTaskInputPortImpl implements SellFoobarTaskInputPort {
  constructor(readonly data: SellFoobarTaskInput) {}
}
