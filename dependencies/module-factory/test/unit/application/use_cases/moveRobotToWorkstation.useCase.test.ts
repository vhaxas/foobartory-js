import type { Right } from '^shared/core/either';
import type { Result } from '^shared/core/result';
import { UniqueId } from '^shared/domain/uniqueId';
import { PositiveInteger } from '^shared/domain/value_objects/positiveInteger.valueObject';
import { StrictlyPositiveInteger } from '^shared/domain/value_objects/strictlyPositiveInteger.valueObject';
import { initEventHandlers } from '^shared/eventHandler.util';
import test from 'ava';

import { MoveRobotToWorkstationInputPort } from '../../../../src/application/ports/moveRobotToWorkstationInputPort.interface';
import type { MoveRobotToWorkstationInput } from '../../../../src/application/ports/moveRobotToWorkstationInputPort.interface';
import { MoveRobotToWorkstationUseCase } from '../../../../src/application/use_cases/moveRobotToWorkstation.useCase';
import { FactoryFactory } from '../../../../src/domain/aggregates/factories/factory.factory';
import type { Factory } from '../../../../src/domain/aggregates/factory.aggregate';
import { RobotFactory } from '../../../../src/domain/entities/factories/robot.factory';
import { TaskFactory } from '../../../../src/domain/entities/factories/task.factory';
import type { Robot } from '../../../../src/domain/entities/robot.entity';
import type { Task } from '../../../../src/domain/entities/task.entity';
import { TaskName } from '../../../../src/domain/entities/task.entity';
import { FactoryRepository } from '../../../../src/domain/repositories/factory.repository';
import { RobotsFactory } from '../../../../src/domain/watched_collections/factories/robotsWatchedCollection.factory';
import { TasksFactory } from '../../../../src/domain/watched_collections/factories/tasksWatchedCollection.factory';
import { ProxyFactoryDataStoreFactory } from '../../../../src/infrastructure/datastores/factories/proxyFactoryDataStore.factory';
import { InMemoryFactoryDataStore } from '../../../../src/infrastructure/datastores/inMemoryFactory.dataStore';

test('should manage to move robot to worstation if any task was assigned', async function (t) {
  // Arrange
  const {
    factoryFactory,
    robotsFactory,
    robotFactory,
    tasksFactory,
    taskFactory,
    factoryRepository,
  } = setup();
  const factoryId = 'abc';
  const nbRobots = 0;
  const maxNumberOfRobotsAllowed = 30;
  const robotId = 'abc';
  const task = <Task>(
    (await taskFactory.create({ name: TaskName.MINE_FOO })).getValue()
  );
  const factoryResult = await factoryFactory.create(
    {
      nbRobots: new PositiveInteger(nbRobots),
      maxNumberOfRobotsAllowed: new StrictlyPositiveInteger(
        maxNumberOfRobotsAllowed,
      ),
      robots: robotsFactory.create([
        <Robot>(
          (
            await robotFactory.create(
              { assignedTask: task },
              UniqueId.fromUniqueId(robotId),
            )
          ).getValue()
        ),
      ]),
      tasks: tasksFactory.create([task]),
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
  await new MoveRobotToWorkstationUseCase(factoryRepository).execute(
    new MoveRobotToWorkstationInputPortImpl({ factoryId, robotId }),
  );

  // Assert
  const optionalMovingRobot = factory.getRobot(UniqueId.fromUniqueId(robotId));
  t.true(optionalMovingRobot.isPresent);
  const movingRobot = optionalMovingRobot.get();
  t.true(movingRobot.isMoving());
});

test('should manage to not move robot to worstation if no tasks assigned', async function (t) {
  // Arrange
  const { factoryFactory, robotsFactory, robotFactory, factoryRepository } =
    setup();
  const factoryId = 'abc';
  const nbRobots = 0;
  const maxNumberOfRobotsAllowed = 30;
  const robotId = 'abc';
  const factoryResult = await factoryFactory.create(
    {
      nbRobots: new PositiveInteger(nbRobots),
      maxNumberOfRobotsAllowed: new StrictlyPositiveInteger(
        maxNumberOfRobotsAllowed,
      ),
      robots: robotsFactory.create([
        <Robot>(
          (
            await robotFactory.create({}, UniqueId.fromUniqueId(robotId))
          ).getValue()
        ),
      ]),
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
  await new MoveRobotToWorkstationUseCase(factoryRepository).execute(
    new MoveRobotToWorkstationInputPortImpl({ factoryId, robotId }),
  );

  // Assert
  const optionalRobot = factory.getRobot(UniqueId.fromUniqueId(robotId));
  t.true(optionalRobot.isPresent);
  const robot = optionalRobot.get();
  t.false(robot.isMoving());
});

const setup = () => {
  const factoryFactory = new FactoryFactory();
  const robotsFactory = new RobotsFactory();
  const robotFactory = new RobotFactory();
  const tasksFactory = new TasksFactory();
  const taskFactory = new TaskFactory();
  const factoryRepository = new FactoryRepository(
    new ProxyFactoryDataStoreFactory(new InMemoryFactoryDataStore()),
  );
  initEventHandlers();
  return {
    factoryFactory,
    robotsFactory,
    robotFactory,
    tasksFactory,
    taskFactory,
    factoryRepository,
  };
};

class MoveRobotToWorkstationInputPortImpl
  implements MoveRobotToWorkstationInputPort
{
  constructor(readonly data: MoveRobotToWorkstationInput) {}
}
