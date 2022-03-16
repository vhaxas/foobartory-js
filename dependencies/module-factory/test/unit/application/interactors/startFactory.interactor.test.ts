import type { Right } from '^shared/core/either';
import type { Option } from '^shared/core/option';
import type { UniqueId } from '^shared/domain/uniqueId';
import { initEventHandlers } from '^shared/eventHandler.util';
import test from 'ava';
import type { ExecutionContext } from 'ava';

import type { FactoryAppErrorBase } from '../../../../src/application/errors/factory.appError';
import { StartFactoryInteractor } from '../../../../src/application/interactors/startFactory.interactor';
import type { StartFactoryInput } from '../../../../src/application/ports/startFactoryInputPort.interface';
import { StartFactoryInputPort } from '../../../../src/application/ports/startFactoryInputPort.interface';
import type { StartFactoryOutput } from '../../../../src/application/ports/startFactoryOutputPort.interface';
import { StartFactoryOutputPort } from '../../../../src/application/ports/startFactoryOutputPort.interface';
import type { Factory } from '../../../../src/domain/aggregates/factory.aggregate';
import { FactoryRepository } from '../../../../src/domain/repositories/factory.repository';
import { ProxyFactoryDataStoreFactory } from '../../../../src/infrastructure/datastores/factories/proxyFactoryDataStore.factory';
import { InMemoryFactoryDataStore } from '../../../../src/infrastructure/datastores/inMemoryFactory.dataStore';

test('should manage to start a new factory with initial number of robots and maximum number of robots allowed as inputs', async function (t) {
  // Arrange
  const { factoryRepository } = setup();
  const nbRobots = 2;
  const maxNumberOfRobotsAllowed = 30;
  const outputPort = new StartFactoryOutputPortImpl(t);

  // Act
  await new StartFactoryInteractor(outputPort, factoryRepository).execute(
    new StartFactoryInputPortImpl({ nbRobots, maxNumberOfRobotsAllowed }),
  );

  // Assert
  const optionalFactoryEither = await factoryRepository.findById(
    outputPort.getId(),
  );
  t.true(optionalFactoryEither.isRight);
  const optionalFactory = (<Right<Option<Factory>>>optionalFactoryEither).value;
  t.true(optionalFactory.isPresent);
  const factory = optionalFactory.get();
  t.true(factory.isRunning());
  t.is(factory.getNumberOfRobots(), nbRobots);
  t.is(factory.getMaximumNumberOfRobotsAllowed(), maxNumberOfRobotsAllowed);
});

const setup = () => {
  const factoryRepository = new FactoryRepository(
    new ProxyFactoryDataStoreFactory(new InMemoryFactoryDataStore()),
  );
  initEventHandlers();
  return { factoryRepository };
};

class StartFactoryInputPortImpl implements StartFactoryInputPort {
  constructor(readonly data: StartFactoryInput) {}
}

class StartFactoryOutputPortImpl implements StartFactoryOutputPort {
  private data?: {
    id?: UniqueId;
  };
  constructor(private readonly t: ExecutionContext) {}
  getId(): UniqueId {
    return this.data!.id!;
  }
  async handle(data: StartFactoryOutput): Promise<void> {
    this.data = data;
  }
  async handleError(error: FactoryAppErrorBase): Promise<void> {
    this.t.fail();
  }
}
