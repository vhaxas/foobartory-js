import type { DataTable } from '@cucumber/cucumber';
import type { Right } from '^shared/core/either';
import type { Option } from '^shared/core/option';
import type { Result } from '^shared/core/result';
import { UniqueId } from '^shared/domain/uniqueId';
import { PositiveInteger } from '^shared/domain/value_objects/positiveInteger.valueObject';
import { StrictlyPositiveInteger } from '^shared/domain/value_objects/strictlyPositiveInteger.valueObject';
import type { DiceRoller } from '^shared/random.util';
import { DeterministicDiceRoller } from '^shared/random.util';
import type { Gambler } from '^shared/random.util';
import { LuckyGambler, UnluckyGambler } from '^shared/random.util';
import { assert, expect } from 'chai';
import { binding, given, then, when } from 'cucumber-tsflow';

import type { FactoryAppErrorBase } from '../../../../src/application/errors/factory.appError';
import { StartFactoryInteractor } from '../../../../src/application/interactors/startFactory.interactor';
import type { AssembleFoobarTaskInput } from '../../../../src/application/ports/assembleFoobarTaskInputPort.interface';
import { AssembleFoobarTaskInputPort } from '../../../../src/application/ports/assembleFoobarTaskInputPort.interface';
import type { AssignTaskInput } from '../../../../src/application/ports/assignTaskInputPort.interface';
import { AssignTaskInputPort } from '../../../../src/application/ports/assignTaskInputPort.interface';
import type { BuyRobotTaskInput } from '../../../../src/application/ports/buyRobotTaskInputPort.interface';
import { BuyRobotTaskInputPort } from '../../../../src/application/ports/buyRobotTaskInputPort.interface';
import type { MineBarTaskInput } from '../../../../src/application/ports/mineBarTaskInputPort.interface';
import { MineBarTaskInputPort } from '../../../../src/application/ports/mineBarTaskInputPort.interface';
import type { MineFooTaskInput } from '../../../../src/application/ports/mineFooTaskInputPort.interface';
import { MineFooTaskInputPort } from '../../../../src/application/ports/mineFooTaskInputPort.interface';
import type { MoveRobotToWorkstationInput } from '../../../../src/application/ports/moveRobotToWorkstationInputPort.interface';
import { MoveRobotToWorkstationInputPort } from '../../../../src/application/ports/moveRobotToWorkstationInputPort.interface';
import type { SellFoobarTaskInput } from '../../../../src/application/ports/sellFoobarTaskInputPort.interface';
import { SellFoobarTaskInputPort } from '../../../../src/application/ports/sellFoobarTaskInputPort.interface';
import type { StartFactoryInput } from '../../../../src/application/ports/startFactoryInputPort.interface';
import { StartFactoryInputPort } from '../../../../src/application/ports/startFactoryInputPort.interface';
import type { StartFactoryOutput } from '../../../../src/application/ports/startFactoryOutputPort.interface';
import { StartFactoryOutputPort } from '../../../../src/application/ports/startFactoryOutputPort.interface';
import type { StopFactoryInput } from '../../../../src/application/ports/stopFactoryInputPort.interface';
import { StopFactoryInputPort } from '../../../../src/application/ports/stopFactoryInputPort.interface';
import { AssembleFoobarTaskUseCase } from '../../../../src/application/use_cases/assembleFoobarTask.useCase';
import { AssignTaskUseCase } from '../../../../src/application/use_cases/assignTask.useCase';
import { BuyRobotTaskUseCase } from '../../../../src/application/use_cases/buyRobotTask.useCase';
import { MineBarTaskUseCase } from '../../../../src/application/use_cases/mineBarTask.useCase';
import { MineFooTaskUseCase } from '../../../../src/application/use_cases/mineFooTask.useCase';
import { MoveRobotToWorkstationUseCase } from '../../../../src/application/use_cases/moveRobotToWorkstation.useCase';
import { SellFoobarTaskUseCase } from '../../../../src/application/use_cases/sellFoobarTask.useCase';
import { StopFactoryUseCase } from '../../../../src/application/use_cases/stopFactory.useCase';
import { FactoryFactory } from '../../../../src/domain/aggregates/factories/factory.factory';
import type { Factory } from '../../../../src/domain/aggregates/factory.aggregate';
import type { IFactoryDataStore } from '../../../../src/domain/datastores/factoryDataStore.interface';
import { RobotFactory } from '../../../../src/domain/entities/factories/robot.factory';
import { TaskFactory } from '../../../../src/domain/entities/factories/task.factory';
import type { Robot } from '../../../../src/domain/entities/robot.entity';
import type { Task } from '../../../../src/domain/entities/task.entity';
import { TaskName } from '../../../../src/domain/entities/task.entity';
import { FactoryRepository } from '../../../../src/domain/repositories/factory.repository';
import { ProxyFactoryDataStoreFactory } from '../../../../src/infrastructure/datastores/factories/proxyFactoryDataStore.factory';
import { InMemoryFactoryDataStore } from '../../../../src/infrastructure/datastores/inMemoryFactory.dataStore';

@binding([InMemoryFactoryDataStore])
export default class FactorySteps {
  private readonly factoryFactory = new FactoryFactory();
  private readonly robotFactory = new RobotFactory();
  private readonly outputPort: StartFactoryOutputPortImpl =
    new StartFactoryOutputPortImpl();
  private readonly factoryRepository: FactoryRepository;
  private readonly startFactoryInteractor: StartFactoryInteractor;
  private readonly mineFooTaskUseCase: MineFooTaskUseCase;
  private readonly mineBarTaskUseCase: MineBarTaskUseCase;
  private readonly buyRobotTaskUseCase: BuyRobotTaskUseCase;
  private readonly assignTaskUseCase: AssignTaskUseCase;
  private readonly moveRobotToWorkstationUseCase: MoveRobotToWorkstationUseCase;
  private readonly stopFactoryUseCase: StopFactoryUseCase;
  private assembleFoobarTaskUseCaseGambler?: Gambler;
  private sellFoobarTaskUseCaseDiceRoller?: DiceRoller;

  constructor(factoryDataStore: IFactoryDataStore) {
    this.factoryRepository = new FactoryRepository(
      new ProxyFactoryDataStoreFactory(factoryDataStore),
    );
    this.startFactoryInteractor = new StartFactoryInteractor(
      this.outputPort,
      this.factoryRepository,
    );
    this.mineFooTaskUseCase = new MineFooTaskUseCase(this.factoryRepository);
    this.mineBarTaskUseCase = new MineBarTaskUseCase(this.factoryRepository);
    this.buyRobotTaskUseCase = new BuyRobotTaskUseCase(this.factoryRepository);
    this.assignTaskUseCase = new AssignTaskUseCase(this.factoryRepository);
    this.moveRobotToWorkstationUseCase = new MoveRobotToWorkstationUseCase(
      this.factoryRepository,
    );
    this.stopFactoryUseCase = new StopFactoryUseCase(this.factoryRepository);
  }

  @given(/^des factory existent:$/)
  someFactoriesExists(dataTable: DataTable) {
    dataTable
      .rows()
      .forEach(
        async ([
          id,
          nbRobots,
          maxNumberOfRobotsAllowed,
          money,
          nbFoos,
          nbBars,
          nbFoobars,
        ]) => {
          const factoryResult = await this.factoryFactory.create(
            {
              nbRobots: new PositiveInteger(parseInt(nbRobots, 10)),
              maxNumberOfRobotsAllowed: new StrictlyPositiveInteger(
                parseInt(maxNumberOfRobotsAllowed, 10),
              ),
              money: new PositiveInteger(parseInt(money, 10)),
              nbFoos: new PositiveInteger(parseInt(nbFoos, 10)),
              nbBars: new PositiveInteger(parseInt(nbBars, 10)),
              nbFoobars: new PositiveInteger(parseInt(nbFoobars, 10)),
            },
            UniqueId.fromUniqueString(id),
          );
          assert(factoryResult.isOk);
          const factory = (<Result<null, Factory>>factoryResult).getValue();
          await this.factoryRepository.add(factory);
          const repositoryContainsFactoryEither =
            await this.factoryRepository.contains(factory);
          assert(repositoryContainsFactoryEither.isRight);
          const repositoryContainsFactory = (<Right<boolean>>(
            repositoryContainsFactoryEither
          )).value;
          assert(repositoryContainsFactory);
        },
      );
  }

  @given(/^des robots existent:$/)
  someRobotsExists(dataTable: DataTable) {
    dataTable.rows().forEach(async ([id, factoryId]) => {
      const optionalFactoryEither = await this.factoryRepository.findById(
        UniqueId.fromUniqueId(factoryId),
      );
      assert(optionalFactoryEither.isRight);
      const optionalFactory = (<Right<Option<Factory>>>optionalFactoryEither)
        .value;
      assert(optionalFactory.isPresent);
      const factory = optionalFactory.get();
      const newRobotResult = await this.robotFactory.create(
        {},
        UniqueId.fromUniqueId(id),
      );
      assert(newRobotResult.isOk);
      const newRobot = <Robot>newRobotResult.getValue();
      factory.addRobot(newRobot);
      await this.factoryRepository.add(factory);
    });
  }

  @given(/^on réussi toujours à assembler un foobar$/)
  setThatAssembleFoobarTaskUseCaseAlwaysSucceed() {
    this.assembleFoobarTaskUseCaseGambler = new LuckyGambler();
  }

  @given(/^on échoue toujours à assembler un foobar$/)
  setThatAssembleFoobarTaskUseCaseAlwaysFailed() {
    this.assembleFoobarTaskUseCaseGambler = new UnluckyGambler();
  }

  @given(/^on vend toujours (\d+) foobar$/)
  setSellFoobarTaskUseCaseDiceRoller(nbFoobarSelled: number) {
    this.sellFoobarTaskUseCaseDiceRoller = new DeterministicDiceRoller(
      nbFoobarSelled,
    );
  }

  @given(/^la factory "([^"]+)" a au moins un robot de disponible$/)
  async setAtLeastOneRobotToIdle(factoryId: string | number) {
    const optionalFactoryEither = await this.factoryRepository.findById(
      UniqueId.fromUniqueId(factoryId),
    );
    assert(optionalFactoryEither.isRight);
    const optionalFactory = (<Right<Option<Factory>>>optionalFactoryEither)
      .value;
    assert(optionalFactory.isPresent);
    const factory = optionalFactory.get();
    let first = true;
    for (const robot of factory.getRobots()) {
      if (first) {
        first = !first;
        continue;
      }
      const task = <Task>(
        (await new TaskFactory().create({ name: TaskName.MINE_FOO })).getValue()
      );
      factory.addTask(task);
      robot.assignTask(task);
      robot.move();
      robot.executeTask();
    }
    await this.factoryRepository.update(factory);
  }

  @given(/^le robot "([^"]+)" de la factory "([^"]+)" a une tâche assignée$/)
  async assignTaskToFactoryRobot(robotId: string, factoryId: string) {
    const optionalFactoryEither = await this.factoryRepository.findById(
      UniqueId.fromUniqueId(factoryId),
    );
    assert(optionalFactoryEither.isRight);
    const optionalFactory = (<Right<Option<Factory>>>optionalFactoryEither)
      .value;
    assert(optionalFactory.isPresent);
    const factory = optionalFactory.get();
    const task = <Task>(
      (await new TaskFactory().create({ name: TaskName.MINE_FOO })).getValue()
    );
    factory.addTask(task);
    const optionalRobot = factory.getRobot(UniqueId.fromUniqueId(robotId));
    assert(optionalRobot.isPresent);
    const robot = optionalRobot.get();
    robot.assignTask(task);
    robot.move();
  }

  @when(
    /^je tente de démarrer la factory avec initialement (\d+) robots et un maximum autorisé de (\d+) robots$/,
  )
  async attemptToStartFactory(
    nbRobots: number,
    maxNumberOfRobotsAllowed: number,
  ) {
    await this.startFactoryInteractor.execute(
      new StartFactoryInputPortImpl({ nbRobots, maxNumberOfRobotsAllowed }),
    );
  }

  @when(/^je tente d'exécuter la tâche "MineFoo" dans la factory "([^"]+)"$/)
  async attemptToExecuteMineFooTask(factoryId: string | number) {
    await this.mineFooTaskUseCase.execute(
      new MineFooTaskInputPortImpl({ factoryId }),
    );
  }

  @when(/^je tente d'exécuter la tâche "MineBar" dans la factory "([^"]+)"$/)
  async attemptToExecuteMineBarTask(factoryId: string | number) {
    await this.mineBarTaskUseCase.execute(
      new MineBarTaskInputPortImpl({ factoryId }),
    );
  }

  @when(
    /^je tente d'exécuter la tâche "AssembleFoobar" dans la factory "([^"]+)"$/,
  )
  async attemptToExecuteAssembleFoobarTask(factoryId: string) {
    await new AssembleFoobarTaskUseCase(this.factoryRepository, {
      gambler: this.assembleFoobarTaskUseCaseGambler,
    }).execute(new AssembleFoobarTaskInputPortImpl({ factoryId }));
  }

  @when(/^je tente d'exécuter la tâche "SellFoobar" dans la factory "([^"]+)"$/)
  async attemptToExecuteSellFoobarTask(factoryId: string) {
    await new SellFoobarTaskUseCase(this.factoryRepository, {
      diceRoller: this.sellFoobarTaskUseCaseDiceRoller,
    }).execute(new SellFoobarTaskInputPortImpl({ factoryId }));
  }

  @when(/^je tente d'exécuter la tâche "BuyRobot" dans la factory "([^"]+)"$/)
  async attemptToExecuteBuyRobotTask(factoryId: string) {
    await this.buyRobotTaskUseCase.execute(
      new BuyRobotTaskInputPortImpl({ factoryId }),
    );
  }

  @when(/^je tente d'assigner une tâche à la factory "([^"]+)"$/)
  async attemptToAssignTask(factoryId: string) {
    await this.assignTaskUseCase.execute(
      new AssignTaskInputPortImpl({ factoryId }),
    );
  }

  @when(
    /^la factory "([^"]+)" tente de déplacer le robot "([^"]+)" vers une station de travail$/,
  )
  async attemptToMoveRobotToWorkstation(factoryId: string, robotId: string) {
    await this.moveRobotToWorkstationUseCase.execute(
      new MoveRobotToWorkstationInputPortImpl({ factoryId, robotId }),
    );
  }

  @when(/^je tente d'arrêter la factory "([^"]+)"$/)
  async attemptToStopFactory(factoryId: string) {
    await this.stopFactoryUseCase.execute(
      new StopFactoryInputPortImpl({ factoryId }),
    );
  }

  @then(/^la factory a démarrée$/)
  async assertThatFactoryHasStarted() {
    assert(this.outputPort.hasData());
    assert(!this.outputPort.hasError());
    const optionalFactoryEither = await this.factoryRepository.findById(
      this.outputPort.getId(),
    );
    assert(optionalFactoryEither.isRight);
    const optionalFactory = (<Right<Option<Factory>>>optionalFactoryEither)
      .value;
    assert(optionalFactory.isPresent);
    const factory = optionalFactory.get();
    assert(factory.isRunning());
  }

  @then(/^la factory a (\d+) robots$/)
  async assertThatFactoryHasCorrectNumberOfRobotsFromContext(nbRobots: number) {
    assert(this.outputPort.hasData());
    assert(!this.outputPort.hasError());
    await this.assertThatFactoryHasCorrectNumberOfRobots(
      this.outputPort.getId().toValue(),
      nbRobots,
    );
  }

  @then(/^la factory "([^"]+)" a (\d+) robots$/)
  async assertThatFactoryHasCorrectNumberOfRobots(
    factoryId: string | number,
    nbRobots: number,
  ) {
    const optionalFactoryEither = await this.factoryRepository.findById(
      UniqueId.fromUniqueId(factoryId),
    );
    assert(optionalFactoryEither.isRight);
    const optionalFactory = (<Right<Option<Factory>>>optionalFactoryEither)
      .value;
    assert(optionalFactory.isPresent);
    const factory = optionalFactory.get();
    expect(factory.getNumberOfRobots()).to.be.equal(nbRobots);
  }

  @then(/^la factory ne peut contenir que (\d+) robots maximum$/)
  async assertThatFactoryHasCorrectMaximumNumberOfRobotsAllowed(
    maximumNumberOfRobotsAllowed: number,
  ) {
    assert(this.outputPort.hasData());
    assert(!this.outputPort.hasError());
    const optionalFactoryEither = await this.factoryRepository.findById(
      this.outputPort.getId(),
    );
    assert(optionalFactoryEither.isRight);
    const optionalFactory = (<Right<Option<Factory>>>optionalFactoryEither)
      .value;
    assert(optionalFactory.isPresent);
    const factory = optionalFactory.get();
    expect(factory.getMaximumNumberOfRobotsAllowed()).to.be.equal(
      maximumNumberOfRobotsAllowed,
    );
  }

  @then(/^la factory "([^"]+)" a (\d+)€$/)
  async assertThatFactoryHasGivenMoney(
    factoryId: string | number,
    money: number,
  ) {
    const optionalFactoryEither = await this.factoryRepository.findById(
      UniqueId.fromUniqueId(factoryId),
    );
    assert(optionalFactoryEither.isRight);
    const optionalFactory = (<Right<Option<Factory>>>optionalFactoryEither)
      .value;
    assert(optionalFactory.isPresent);
    const factory = optionalFactory.get();
    expect(factory.getMoney()).to.be.equal(money);
  }

  @then(/^la factory "([^"]+)" a (\d+) foo$/)
  async assertThatFactoryHasGivenFoos(
    factoryId: string | number,
    nbFoos: number,
  ) {
    const optionalFactoryEither = await this.factoryRepository.findById(
      UniqueId.fromUniqueId(factoryId),
    );
    assert(optionalFactoryEither.isRight);
    const optionalFactory = (<Right<Option<Factory>>>optionalFactoryEither)
      .value;
    assert(optionalFactory.isPresent);
    const factory = optionalFactory.get();
    expect(factory.getNumberOfFoos()).to.be.equal(nbFoos);
  }

  @then(/^la factory "([^"]+)" a (\d+) bar$/)
  async assertThatFactoryHasGivenBars(
    factoryId: string | number,
    nbBars: number,
  ) {
    const optionalFactoryEither = await this.factoryRepository.findById(
      UniqueId.fromUniqueId(factoryId),
    );
    assert(optionalFactoryEither.isRight);
    const optionalFactory = (<Right<Option<Factory>>>optionalFactoryEither)
      .value;
    assert(optionalFactory.isPresent);
    const factory = optionalFactory.get();
    expect(factory.getNumberOfBars()).to.be.equal(nbBars);
  }

  @then(/^la factory "([^"]+)" a (\d+) foobar$/)
  async assertThatFactoryHasGivenFoobars(
    factoryId: string | number,
    nbFoobars: number,
  ) {
    const optionalFactoryEither = await this.factoryRepository.findById(
      UniqueId.fromUniqueId(factoryId),
    );
    assert(optionalFactoryEither.isRight);
    const optionalFactory = (<Right<Option<Factory>>>optionalFactoryEither)
      .value;
    assert(optionalFactory.isPresent);
    const factory = optionalFactory.get();
    expect(factory.getNumberOfFoobars()).to.be.equal(nbFoobars);
  }

  @then(/^la dernière tâche assignée de la factory "([^"]+)" est "([^"]+)"$/)
  async assertThatLastFactoryAssignedTaskIsTheOneGiven(
    factoryId: string | number,
    taskName: string,
  ) {
    const optionalFactoryEither = await this.factoryRepository.findById(
      UniqueId.fromUniqueId(factoryId),
    );
    assert(optionalFactoryEither.isRight);
    const optionalFactory = (<Right<Option<Factory>>>optionalFactoryEither)
      .value;
    assert(optionalFactory.isPresent);
    const factory = optionalFactory.get();
    const optionalTask = factory.getLastAssignedTask();
    assert(optionalTask.isPresent);
    const task = optionalTask.get();
    expect(task.getName()).to.be.equal(taskName);
  }

  @then(
    /^la dernière tâche assignée de la factory "([^"]+)" n'est pas "([^"]+)"$/,
  )
  async assertThatLastFactoryAssignedTaskIsNotTheOneGiven(
    factoryId: string | number,
    taskName: string,
  ) {
    const optionalFactoryEither = await this.factoryRepository.findById(
      UniqueId.fromUniqueId(factoryId),
    );
    assert(optionalFactoryEither.isRight);
    const optionalFactory = (<Right<Option<Factory>>>optionalFactoryEither)
      .value;
    assert(optionalFactory.isPresent);
    const factory = optionalFactory.get();
    const optionalTask = factory.getLastAssignedTask();
    if (optionalTask.isPresent) {
      const task = optionalTask.get();
      expect(task.getName()).to.be.not.equal(taskName);
    }
  }

  @then(/^la factory "([^"]+)" n'a aucun robot de disponible$/)
  async assertThatEveryFactoryRobotsAreBusy(factoryId: string | number) {
    const optionalFactoryEither = await this.factoryRepository.findById(
      UniqueId.fromUniqueId(factoryId),
    );
    assert(optionalFactoryEither.isRight);
    const optionalFactory = (<Right<Option<Factory>>>optionalFactoryEither)
      .value;
    assert(optionalFactory.isPresent);
    const factory = optionalFactory.get();
    assert(factory.getRobots().every((robot) => !robot.isIdle()));
  }

  @then(/^le robot "([^"]+)" de la factory "([^"]+)" se déplace$/)
  async assertThatRobotIsMoving(robotId: string, factoryId: string) {
    const optionalFactoryEither = await this.factoryRepository.findById(
      UniqueId.fromUniqueId(factoryId),
    );
    assert(optionalFactoryEither.isRight);
    const optionalFactory = (<Right<Option<Factory>>>optionalFactoryEither)
      .value;
    assert(optionalFactory.isPresent);
    const factory = optionalFactory.get();
    const optionalRobot = factory.getRobot(UniqueId.fromUniqueId(robotId));
    assert(optionalRobot.isPresent);
    const robot = optionalRobot.get();
    assert(robot.isMoving());
  }

  @then(/^le robot "([^"]+)" de la factory "([^"]+)" ne se déplace pas$/)
  async assertThatRobotIsNotMoving(robotId: string, factoryId: string) {
    const optionalFactoryEither = await this.factoryRepository.findById(
      UniqueId.fromUniqueId(factoryId),
    );
    assert(optionalFactoryEither.isRight);
    const optionalFactory = (<Right<Option<Factory>>>optionalFactoryEither)
      .value;
    assert(optionalFactory.isPresent);
    const factory = optionalFactory.get();
    const optionalRobot = factory.getRobot(UniqueId.fromUniqueId(robotId));
    assert(optionalRobot.isPresent);
    const robot = optionalRobot.get();
    assert(!robot.isMoving());
  }

  @then(/^la factory "([^"]+)" est arrêtée$/)
  async assertThatFactoryIsNotRunning(factoryId: string) {
    const optionalFactoryEither = await this.factoryRepository.findById(
      UniqueId.fromUniqueId(factoryId),
    );
    assert(optionalFactoryEither.isRight);
    const optionalFactory = (<Right<Option<Factory>>>optionalFactoryEither)
      .value;
    assert(optionalFactory.isPresent);
    const factory = optionalFactory.get();
    assert(!factory.isRunning());
  }
}

class StartFactoryInputPortImpl implements StartFactoryInputPort {
  constructor(readonly data: StartFactoryInput) {}
}

class MineFooTaskInputPortImpl implements MineFooTaskInputPort {
  constructor(readonly data: MineFooTaskInput) {}
}

class MineBarTaskInputPortImpl implements MineBarTaskInputPort {
  constructor(readonly data: MineBarTaskInput) {}
}

class AssembleFoobarTaskInputPortImpl implements AssembleFoobarTaskInputPort {
  constructor(readonly data: AssembleFoobarTaskInput) {}
}

class SellFoobarTaskInputPortImpl implements SellFoobarTaskInputPort {
  constructor(readonly data: SellFoobarTaskInput) {}
}

class BuyRobotTaskInputPortImpl implements BuyRobotTaskInputPort {
  constructor(readonly data: BuyRobotTaskInput) {}
}

class AssignTaskInputPortImpl implements AssignTaskInputPort {
  constructor(readonly data: AssignTaskInput) {}
}

class MoveRobotToWorkstationInputPortImpl
  implements MoveRobotToWorkstationInputPort
{
  constructor(readonly data: MoveRobotToWorkstationInput) {}
}

class StopFactoryInputPortImpl implements StopFactoryInputPort {
  constructor(readonly data: StopFactoryInput) {}
}

class StartFactoryOutputPortImpl implements StartFactoryOutputPort {
  private data?: {
    id?: UniqueId;
  };
  private error?: FactoryAppErrorBase;
  hasData(): boolean {
    return !!this.data;
  }
  hasError(): boolean {
    return !!this.error;
  }
  getId(): UniqueId {
    return this.data!.id!;
  }
  async handle(data: StartFactoryOutput): Promise<void> {
    this.data = data;
  }
  async handleError(error: FactoryAppErrorBase): Promise<void> {
    this.error = error;
  }
}
