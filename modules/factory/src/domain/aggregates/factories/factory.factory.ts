import { Result } from '^shared/core/result';
import type { Nullable } from '^shared/core/types';
import { EntityFactory } from '^shared/domain/entity.factory';
import type { UniqueId } from '^shared/domain/uniqueId';
import { PositiveInteger } from '^shared/domain/value_objects/positiveInteger.valueObject';
import type { StrictlyPositiveInteger } from '^shared/domain/value_objects/strictlyPositiveInteger.valueObject';

import type { Bar, BarProps } from '../../entities/bar.entity';
import { BarFactory } from '../../entities/factories/bar.factory';
import { FooFactory } from '../../entities/factories/foo.factory';
import {
  FoobarFactory,
  FoobarFactoryProps,
} from '../../entities/factories/foobar.factory';
import { RobotFactory } from '../../entities/factories/robot.factory';
import { TaskFactory } from '../../entities/factories/task.factory';
import type { Foo, FooProps } from '../../entities/foo.entity';
import type { Foobar } from '../../entities/foobar.entity';
import { Task, TaskName, TaskProps } from '../../entities/task.entity';
import type { FactoryDomainError } from '../../errors/factory.error';
import { FactoryDomainErrorFactory } from '../../errors/factory.error';
import { FactoryDomainEventFactory } from '../../events/factoryDomainEvent.factory';
import type { Bars } from '../../watched_collections/bars.watchedCollection';
import { BarsFactory } from '../../watched_collections/factories/barsWatchedCollection.factory';
import { FoobarsFactory } from '../../watched_collections/factories/foobarsWatchedCollection.factory';
import { FoosFactory } from '../../watched_collections/factories/foosWatchedCollection.factory';
import { RobotsFactory } from '../../watched_collections/factories/robotsWatchedCollection.factory';
import { TasksFactory } from '../../watched_collections/factories/tasksWatchedCollection.factory';
import type { Foobars } from '../../watched_collections/foobars.watchedCollection';
import type { Foos } from '../../watched_collections/foos.watchedCollection';
import type { Robots } from '../../watched_collections/robots.watchedCollection';
import type { Tasks } from '../../watched_collections/tasks.watchedCollection';
import { Factory } from '../factory.aggregate';

export interface FactoryFactoryProps {
  nbRobots: PositiveInteger;
  maxNumberOfRobotsAllowed: StrictlyPositiveInteger;
  robots?: Robots;
  money?: PositiveInteger;
  foos?: Foos;
  nbFoos?: PositiveInteger;
  bars?: Bars;
  nbBars?: PositiveInteger;
  foobars?: Foobars;
  nbFoobars?: PositiveInteger;
  tasks?: Tasks;
  nbTasks?: PositiveInteger;
}

export class FactoryFactory
implements EntityFactory<Factory, FactoryFactoryProps, FactoryDomainError> {
  async create(
    props: FactoryFactoryProps,
    id?: Nullable<UniqueId>,
  ): Promise<Result<Nullable<FactoryDomainError>, Nullable<Factory>>> {
    const {
      nbRobots,
      maxNumberOfRobotsAllowed,
      robots,
      money,
      foos,
      nbFoos,
      bars,
      nbBars,
      foobars,
      nbFoobars,
      tasks,
      nbTasks,
    } = props;
    if (!nbRobots.isValid) {
      return Result.fail(FactoryDomainErrorFactory.invalidNbRobots(nbRobots));
    }
    if (!maxNumberOfRobotsAllowed.isValid) {
      return Result.fail(
        FactoryDomainErrorFactory.invalidMaxNumberOfRobotsAllowed(
          maxNumberOfRobotsAllowed,
        ),
      );
    }
    if (money && !money.isValid) {
      return Result.fail(FactoryDomainErrorFactory.invalidMoney(money));
    }
    if (nbFoos && !nbFoos.isValid) {
      return Result.fail(FactoryDomainErrorFactory.invalidNbFoos(nbFoos));
    }
    if (nbBars && !nbBars.isValid) {
      return Result.fail(FactoryDomainErrorFactory.invalidNbBars(nbBars));
    }
    if (nbFoobars && !nbFoobars.isValid) {
      return Result.fail(FactoryDomainErrorFactory.invalidNbFoobars(nbFoobars));
    }
    if (nbTasks && !nbTasks.isValid) {
      return Result.fail(FactoryDomainErrorFactory.invalidNbTasks(nbTasks));
    }
    const factory = new Factory(
      {
        robots: robots || new RobotsFactory().create([]),
        maxNumberOfRobotsAllowed: maxNumberOfRobotsAllowed.value,
        money: (money || new PositiveInteger()).value,
        foos: foos || new FoosFactory().create([]),
        bars: bars || new BarsFactory().create([]),
        foobars: foobars || new FoobarsFactory().create([]),
        tasks: tasks || new TasksFactory().create([]),
      },
      id,
    );
    if (!id) {
      factory.addDomainEvent(FactoryDomainEventFactory.factoryCreated(factory));
    }
    this.addNewRobots(factory, nbRobots.value);
    this.addNewFoos(factory, (nbFoos || new PositiveInteger()).value);
    this.addNewBars(factory, (nbBars || new PositiveInteger()).value);
    this.addNewFoobars(factory, (nbFoobars || new PositiveInteger()).value);
    this.addNewTasks(factory, (nbTasks || new PositiveInteger()).value);
    return Result.ok(factory);
  }

  // eslint-disable-next-line class-methods-use-this
  private async addNewRobots(factory: Factory, nbRobots: number) {
    const robotFactory = new RobotFactory();
    let i = 0;
    while (i < nbRobots) {
      // eslint-disable-next-line no-await-in-loop
      const newRobot = (await robotFactory.create({})).getValue();
      if (newRobot) {
        factory.addRobot(newRobot);
        i += 1;
      }
    }
  }

  // eslint-disable-next-line class-methods-use-this
  private async createFoo(
    props: FooProps,
    fooFactory = new FooFactory(),
  ): Promise<Foo> {
    let newFooResult = await fooFactory.create(props);
    while (!newFooResult.isOk || !newFooResult.getValue()) {
      // eslint-disable-next-line no-await-in-loop
      newFooResult = await fooFactory.create(props);
    }
    return <Foo>newFooResult.getValue();
  }

  private async addNewFoos(factory: Factory, nbFoos: number) {
    const fooFactory = new FooFactory();
    let i = 0;
    while (i < nbFoos) {
      // eslint-disable-next-line no-await-in-loop
      factory.addFoo(await this.createFoo({}, fooFactory));
      i += 1;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  private async createBar(
    props: BarProps,
    barFactory = new BarFactory(),
  ): Promise<Bar> {
    let newBarResult = await barFactory.create(props);
    while (!newBarResult.isOk || !newBarResult.getValue()) {
      // eslint-disable-next-line no-await-in-loop
      newBarResult = await barFactory.create(props);
    }
    return <Bar>newBarResult.getValue();
  }

  private async addNewBars(factory: Factory, nbBars: number) {
    const barFactory = new BarFactory();
    let i = 0;
    while (i < nbBars) {
      // eslint-disable-next-line no-await-in-loop
      factory.addBar(await this.createBar({}, barFactory));
      i += 1;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  private async createFoobar(
    props: FoobarFactoryProps,
    foobarFactory = new FoobarFactory(),
  ): Promise<Foobar> {
    let newFoobarResult = await foobarFactory.create(props);
    while (!newFoobarResult.isOk || !newFoobarResult.getValue()) {
      // eslint-disable-next-line no-await-in-loop
      newFoobarResult = await foobarFactory.create(props);
    }
    const foobar = <Foobar>newFoobarResult.getValue();
    foobar.getFoo().usedForAssemblingFoobar(foobar);
    foobar.getBar().usedForAssemblingFoobar(foobar);
    foobar.assembled();
    return foobar;
  }

  private async addNewFoobars(factory: Factory, nbFoobars: number) {
    const foobarFactory = new FoobarFactory();
    let i = 0;
    while (i < nbFoobars) {
      // eslint-disable-next-line no-await-in-loop
      const foobar = await this.createFoobar({}, foobarFactory);
      factory.addFoobar(foobar);
      factory.addFoo(foobar.getFoo());
      factory.addBar(foobar.getBar());
      i += 1;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  private async createTask(
    props: TaskProps,
    taskFactory = new TaskFactory(),
  ): Promise<Task> {
    let newTaskResult = await taskFactory.create(props);
    while (!newTaskResult.isOk || !newTaskResult.getValue()) {
      // eslint-disable-next-line no-await-in-loop
      newTaskResult = await taskFactory.create(props);
    }
    return <Task>newTaskResult.getValue();
  }

  private async addNewTasks(factory: Factory, nbTasks: number) {
    const taskFactory = new TaskFactory();
    let i = 0;
    while (i < nbTasks) {
      factory.addTask(
        // eslint-disable-next-line no-await-in-loop
        await this.createTask({ name: TaskName.MINE_FOO }, taskFactory),
      );
      i += 1;
    }
  }
}
