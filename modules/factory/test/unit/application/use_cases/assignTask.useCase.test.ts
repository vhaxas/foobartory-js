import type { Right } from '^shared/core/either';
import type { Result } from '^shared/core/result';
import { UniqueId } from '^shared/domain/uniqueId';
import { PositiveInteger } from '^shared/domain/value_objects/positiveInteger.valueObject';
import { StrictlyPositiveInteger } from '^shared/domain/value_objects/strictlyPositiveInteger.valueObject';
import { initEventHandlers } from '^shared/eventHandler.util';
import test from 'ava';

import type { AssignTaskInput } from '../../../../src/application/ports/assignTaskInputPort.interface';
import { AssignTaskInputPort } from '../../../../src/application/ports/assignTaskInputPort.interface';
import { AssignTaskUseCase } from '../../../../src/application/use_cases/assignTask.useCase';
import { FactoryFactory } from '../../../../src/domain/aggregates/factories/factory.factory';
import type { Factory } from '../../../../src/domain/aggregates/factory.aggregate';
import { TaskName } from '../../../../src/domain/entities/task.entity';
import { FactoryRepository } from '../../../../src/domain/repositories/factory.repository';
import { ProxyFactoryDataStoreFactory } from '../../../../src/infrastructure/datastores/factories/proxyFactoryDataStore.factory';
import { InMemoryFactoryDataStore } from '../../../../src/infrastructure/datastores/inMemoryFactory.dataStore';

test('should manage to assign a task in order to buy a robot', async function (t) {
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
  await new AssignTaskUseCase(factoryRepository).execute(
    new AssignTaskInputPortImpl({ factoryId }),
  );

  // Assert
  const optionalTask = factory.getLastAssignedTask();
  t.true(optionalTask.isPresent);
  const task = optionalTask.get();
  t.is(task.getName(), TaskName.BUY_ROBOT);
});

const setup = () => {
  const factoryFactory = new FactoryFactory();
  const factoryRepository = new FactoryRepository(
    new ProxyFactoryDataStoreFactory(new InMemoryFactoryDataStore()),
  );
  initEventHandlers();
  return { factoryFactory, factoryRepository };
};

class AssignTaskInputPortImpl implements AssignTaskInputPort {
  constructor(readonly data: AssignTaskInput) {}
}
