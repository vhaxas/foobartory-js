import type { Right } from '^shared/core/either';
import type { Option } from '^shared/core/option';
import type { Result } from '^shared/core/result';
import { UniqueId } from '^shared/domain/uniqueId';
import { PositiveInteger } from '^shared/domain/value_objects/positiveInteger.valueObject';
import { StrictlyPositiveInteger } from '^shared/domain/value_objects/strictlyPositiveInteger.valueObject';
import { initEventHandlers } from '^shared/eventHandler.util';
import test from 'ava';

import type { StopFactoryInput } from '../../../../src/application/ports/stopFactoryInputPort.interface';
import { StopFactoryInputPort } from '../../../../src/application/ports/stopFactoryInputPort.interface';
import { StopFactoryUseCase } from '../../../../src/application/use_cases/stopFactory.useCase';
import { FactoryFactory } from '../../../../src/domain/aggregates/factories/factory.factory';
import type { Factory } from '../../../../src/domain/aggregates/factory.aggregate';
import { FactoryRepository } from '../../../../src/domain/repositories/factory.repository';
import { ProxyFactoryDataStoreFactory } from '../../../../src/infrastructure/datastores/factories/proxyFactoryDataStore.factory';
import { InMemoryFactoryDataStore } from '../../../../src/infrastructure/datastores/inMemoryFactory.dataStore';

test('should manage to stop factory', async function (t) {
  // Arrange
  const { factoryFactory, factoryRepository } = setup();
  const factoryId = 'abc';
  const nbRobots = 2;
  const maxNumberOfRobotsAllowed = 30;
  const factoryResult = await factoryFactory.create(
    {
      nbRobots: new PositiveInteger(nbRobots),
      maxNumberOfRobotsAllowed: new StrictlyPositiveInteger(
        maxNumberOfRobotsAllowed,
      ),
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
  await new StopFactoryUseCase(factoryRepository).execute(
    new StopFactoryInputPortImpl({ factoryId }),
  );

  // Assert
  const optionalFactoryEither = await factoryRepository.findById(
    UniqueId.fromUniqueString(factoryId),
  );
  t.true(optionalFactoryEither.isRight);
  const optionalFactory = (<Right<Option<Factory>>>optionalFactoryEither).value;
  t.true(optionalFactory.isPresent);
  const retrievedFactory = optionalFactory.get();
  t.false(retrievedFactory.isRunning());
});

const setup = () => {
  const factoryFactory = new FactoryFactory();
  const factoryRepository = new FactoryRepository(
    new ProxyFactoryDataStoreFactory(new InMemoryFactoryDataStore()),
  );
  initEventHandlers();
  return { factoryFactory, factoryRepository };
};

class StopFactoryInputPortImpl implements StopFactoryInputPort {
  constructor(readonly data: StopFactoryInput) {}
}
