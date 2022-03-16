import type { Right } from '^shared/core/either';
import type { Option } from '^shared/core/option';
import type { Result } from '^shared/core/result';
import { UniqueId } from '^shared/domain/uniqueId';
import { PositiveInteger } from '^shared/domain/value_objects/positiveInteger.valueObject';
import { StrictlyPositiveInteger } from '^shared/domain/value_objects/strictlyPositiveInteger.valueObject';
import { initEventHandlers } from '^shared/eventHandler.util';
import type { Randomizer } from '^shared/random.util';
import test from 'ava';

import type { MineBarTaskInput } from '../../../../src/application/ports/mineBarTaskInputPort.interface';
import { MineBarTaskInputPort } from '../../../../src/application/ports/mineBarTaskInputPort.interface';
import { MineBarTaskUseCase } from '../../../../src/application/use_cases/mineBarTask.useCase';
import { FactoryFactory } from '../../../../src/domain/aggregates/factories/factory.factory';
import type { Factory } from '../../../../src/domain/aggregates/factory.aggregate';
import { FactoryRepository } from '../../../../src/domain/repositories/factory.repository';
import { ProxyFactoryDataStoreFactory } from '../../../../src/infrastructure/datastores/factories/proxyFactoryDataStore.factory';
import { InMemoryFactoryDataStore } from '../../../../src/infrastructure/datastores/inMemoryFactory.dataStore';

test('should manage to execute task in order to mine bar', async function (t) {
  // Arrange
  const { factoryFactory, factoryRepository } = setup();
  const factoryId = 'abc';
  const nbRobots = 2;
  const maxNumberOfRobotsAllowed = 30;
  const money = 3;
  const nbBars = 1;
  const factoryResult = await factoryFactory.create(
    {
      nbRobots: new PositiveInteger(nbRobots),
      maxNumberOfRobotsAllowed: new StrictlyPositiveInteger(
        maxNumberOfRobotsAllowed,
      ),
      money: new PositiveInteger(money),
      nbBars: new PositiveInteger(nbBars),
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
  await new MineBarTaskUseCase(factoryRepository).execute(
    new MineBarTaskInputPortImpl({ factoryId }),
  );

  // Assert
  const optionalFactoryEither = await factoryRepository.findById(
    UniqueId.fromUniqueString(factoryId),
  );
  t.true(optionalFactoryEither.isRight);
  const optionalFactory = (<Right<Option<Factory>>>optionalFactoryEither).value;
  t.true(optionalFactory.isPresent);
  const retrievedFactory = optionalFactory.get();
  t.is(retrievedFactory.getNumberOfBars(), nbBars + 1);
});

const setup = ({ randomizer }: { randomizer?: Randomizer } = {}) => {
  const factoryFactory = new FactoryFactory();
  const factoryRepository = new FactoryRepository(
    new ProxyFactoryDataStoreFactory(new InMemoryFactoryDataStore()),
  );
  initEventHandlers();
  return { factoryFactory, factoryRepository, randomizer };
};

class MineBarTaskInputPortImpl implements MineBarTaskInputPort {
  constructor(readonly data: MineBarTaskInput) {}
}
