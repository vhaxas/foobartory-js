import { Option } from '^shared/core/option';
import type { Nullable } from '^shared/core/types';
import type { UniqueId } from '^shared/domain/uniqueId';
import { DiceRoller, Gambler } from '^shared/random.util';

import type { Factory } from '../aggregates/factory.aggregate';
import type { Bar } from '../entities/bar.entity';
import { BarFactory } from '../entities/factories/bar.factory';
import { FooFactory } from '../entities/factories/foo.factory';
import { FoobarFactory } from '../entities/factories/foobar.factory';
import { RobotFactory } from '../entities/factories/robot.factory';
import { TaskFactory } from '../entities/factories/task.factory';
import type { Foo } from '../entities/foo.entity';
import type { Foobar } from '../entities/foobar.entity';
import type { Robot } from '../entities/robot.entity';
import type { Task } from '../entities/task.entity';
import { TaskName } from '../entities/task.entity';
import { FoobarsFactory } from '../watched_collections/factories/foobarsWatchedCollection.factory';
import { RobotsFactory } from '../watched_collections/factories/robotsWatchedCollection.factory';
import type { Foobars } from '../watched_collections/foobars.watchedCollection';
import type { Robots } from '../watched_collections/robots.watchedCollection';

export class FactoryService {
  private readonly diceRoller?: DiceRoller;

  private readonly gambler?: Gambler;

  constructor(
    private readonly factory: Factory,
    helpers?: { diceRoller?: DiceRoller; gambler?: Gambler },
  ) {
    this.diceRoller = helpers?.diceRoller;
    this.gambler = helpers?.gambler;
  }

  async stopFactory(): Promise<void> {
    this.factory.stop();
  }

  async shouldStopFactory(): Promise<boolean> {
    return (
      this.factory.getNumberOfRobots()
      >= this.factory.getMaximumNumberOfRobotsAllowed()
    );
  }

  async mineFoo(): Promise<Option<Foo>> {
    return Option.of(await this.updateFactoryAfterMiningFoo());
  }

  async mineBar(): Promise<Option<Bar>> {
    return Option.of(await this.updateFactoryAfterMiningBar());
  }

  async assembleFoobar(): Promise<Option<Foobar>> {
    let optionalFoobar = Option.empty<Foobar>();
    if (this.canAssembleFoobar()) {
      const optionalFoo = this.factory.getRandomFoo();
      const optionalBar = this.factory.getRandomBar();
      if (optionalFoo.isPresent && optionalBar.isPresent) {
        const foo = optionalFoo.get();
        const bar = optionalBar.get();
        const foobarFactory = new FoobarFactory();
        const newFoobarProps = {
          foo,
          bar,
        };
        let newFoobarResult = await foobarFactory.create(newFoobarProps);
        while (!newFoobarResult.isOk && !newFoobarResult.getValue()) {
          // eslint-disable-next-line no-await-in-loop
          newFoobarResult = await foobarFactory.create(newFoobarProps);
        }
        const newFoobar = <Foobar>newFoobarResult.getValue();
        newFoobar.assembling();
        this.factory
          .getFoo(newFoobar.getFoo().id)
          .get()
          .usedForAssemblingFoobar(newFoobar);
        this.factory
          .getBar(newFoobar.getBar().id)
          .get()
          .usedForAssemblingFoobar(newFoobar);
        if ((this.gambler || new Gambler(0.6)).gamble()) {
          newFoobar.assembled();
        } else {
          newFoobar.lost();
          this.factory.getFoo(newFoobar.getFoo().id).get().lost();
          this.factory.getBar(newFoobar.getBar().id).get().available();
        }
        this.factory.addFoobar(newFoobar);
        optionalFoobar = Option.of(newFoobar);
      }
    }
    return optionalFoobar;
  }

  async sellFoobars(): Promise<Option<Foobars>> {
    let optionalFoobars = Option.empty<Foobars>();
    if (this.canSellFoobars()) {
      const diceRoller = this.diceRoller || new DiceRoller(5);
      const numberOfFoobarsSelled = Math.min(
        this.factory.getNumberOfFoobars(),
        diceRoller.roll(1),
      );
      const foobars = new FoobarsFactory().create();
      let i = 1;
      while (i <= numberOfFoobarsSelled) {
        const optionalFoobar = this.factory.getRandomFoobar();
        if (optionalFoobar.isPresent) {
          const foobar = optionalFoobar.get();
          foobar.selled();
          foobars.add(foobar);
          i += 1;
        }
      }
      this.factory.addMoney(numberOfFoobarsSelled);
      optionalFoobars = Option.of(foobars);
    }
    return optionalFoobars;
  }

  async buyNewRobot(): Promise<Option<Robot>> {
    let optionalRobot = Option.empty<Robot>();
    if (this.canBuyNewRobot()) {
      const robotFactory = new RobotFactory();
      const newRobotProps = {};
      let newRobotResult = await robotFactory.create(newRobotProps);
      while (!newRobotResult.isOk && !newRobotResult.getValue()) {
        // eslint-disable-next-line no-await-in-loop
        newRobotResult = await robotFactory.create(newRobotProps);
      }
      const newRobot = <Robot>newRobotResult.getValue();
      await this.updateFactoryAfterByingNewRobot(newRobot);
      optionalRobot = Option.of(newRobot);
    }
    return optionalRobot;
  }

  async assignTask(
    optionalRobotId?: Nullable<UniqueId>,
  ): Promise<Option<Robots>> {
    let optionalRobots = Option.empty<Robots>();
    const optionalAssignableRobots = this.getTaskAssignableRobots(optionalRobotId);
    if (optionalAssignableRobots.isPresent) {
      const assignableRobots = optionalAssignableRobots.get();
      assignableRobots.forEachItems(async (assignableRobot) => {
        let taskName: TaskName;
        if (this.shouldBuyNewRobot()) {
          taskName = TaskName.BUY_ROBOT;
        } else if (this.shouldSellFoobars()) {
          taskName = TaskName.SELL_FOOBAR;
        } else if (this.shouldAssembleFoobar()) {
          taskName = TaskName.ASSEMBLE_FOOBAR;
        } else if (this.shouldMineFoo()) {
          taskName = TaskName.MINE_FOO;
        } else {
          taskName = TaskName.MINE_BAR;
        }
        const taskFactory = new TaskFactory();
        const newTaskProps = { name: taskName };
        let newTaskResult = await taskFactory.create(newTaskProps);
        while (!newTaskResult.isOk && !newTaskResult.getValue()) {
          // eslint-disable-next-line no-await-in-loop
          newTaskResult = await taskFactory.create(newTaskProps);
        }
        const newTask = <Task>newTaskResult.getValue();
        this.factory.addTask(newTask);
        assignableRobot.assignTask(newTask);
      });
      optionalRobots = Option.of(assignableRobots);
    }
    return optionalRobots;
  }

  async moveRobotToWorkstation(
    robotId: UniqueId,
  ): Promise<Option<Nullable<boolean>>> {
    let optionalHasMoved = Option.empty<Nullable<boolean>>();
    const optionalMovingRobot = this.factory.getRobot(robotId);
    if (optionalMovingRobot.isPresent) {
      const movingRobot = optionalMovingRobot.get();
      const previousTask = movingRobot.getPreviousTask();
      const nextTask = movingRobot.getAssignedTask();
      if (previousTask) {
        if (nextTask && previousTask.hasName(nextTask.getName())) {
          movingRobot.move();
          optionalHasMoved = Option.of(true);
        } else {
          optionalHasMoved = Option.of(false);
        }
      } else if (nextTask) {
        movingRobot.move();
        optionalHasMoved = Option.of(true);
      } else {
        optionalHasMoved = Option.of(null);
      }
    }
    return optionalHasMoved;
  }

  async executeTask(taskId: UniqueId) {
    this.factory
      .getRobots()
      .filter((robot) => robot.getAssignedTask()?.hasId(taskId))
      .forEach((robot) => {
        robot.executeTask();
      });
  }

  async completeTask(robotId?: UniqueId) {
    if (robotId) {
      const optionalRobot = this.factory.getRobot(robotId);
      if (optionalRobot.isPresent) {
        const robot = optionalRobot.get();
        robot.completeTask();
      }
    } else {
      this.factory.getRobots().forEach((robot) => {
        robot.completeTask();
      });
    }
  }

  private async updateFactoryAfterMiningFoo() {
    const fooFactory = new FooFactory();
    const newFooProps = {};
    let newFooResult = await fooFactory.create(newFooProps);
    while (!newFooResult.isOk && !newFooResult.getValue()) {
      // eslint-disable-next-line no-await-in-loop
      newFooResult = await fooFactory.create(newFooProps);
    }
    const newFoo = <Foo>newFooResult.getValue();
    this.factory.addFoo(newFoo);
    return newFoo;
  }

  private async updateFactoryAfterMiningBar() {
    const barFactory = new BarFactory();
    const newBarProps = {};
    let newBarResult = await barFactory.create(newBarProps);
    while (!newBarResult.isOk && !newBarResult.getValue()) {
      // eslint-disable-next-line no-await-in-loop
      newBarResult = await barFactory.create(newBarProps);
    }
    const newBar = <Bar>newBarResult.getValue();
    this.factory.addBar(newBar);
    return newBar;
  }

  private shouldMineFoo(): boolean {
    return (
      (this.hasSuffisantMoneyToBuyRobot()
        && !this.hasSuffisantFoosToBuyRobot())
      || this.factory.getNumberOfFoos() <= this.factory.getNumberOfBars()
    );
  }

  private canAssembleFoobar(): boolean {
    return (
      this.factory.getNumberOfFoos() > 0 && this.factory.getNumberOfBars() > 0
    );
  }

  private shouldAssembleFoobar(): boolean {
    return this.canAssembleFoobar() && !this.hasSuffisantMoneyToBuyRobot();
  }

  private canSellFoobars(): boolean {
    return this.factory.getNumberOfFoobars() > 0;
  }

  private shouldSellFoobars(): boolean {
    return this.canSellFoobars() && this.factory.getNumberOfFoobars() > 4;
  }

  private hasSuffisantMoneyToBuyRobot(): boolean {
    return this.factory.getMoney() >= 3;
  }

  private hasSuffisantFoosToBuyRobot(): boolean {
    return this.factory.getNumberOfFoos() >= 6;
  }

  private canBuyNewRobot(): boolean {
    return (
      this.factory.getNumberOfRobots()
        < this.factory.getMaximumNumberOfRobotsAllowed()
      && this.hasSuffisantMoneyToBuyRobot()
      && this.hasSuffisantFoosToBuyRobot()
    );
  }

  private shouldBuyNewRobot(): boolean {
    return this.canBuyNewRobot();
  }

  private async updateFactoryAfterByingNewRobot(robot: Robot) {
    this.factory.addRobot(robot);
    this.factory.removeMoney(3);
    let i = 0;
    while (i < 6) {
      const optionalFoo = this.factory.getRandomFoo();
      if (optionalFoo.isPresent) {
        const foo = optionalFoo.get();
        foo.usedForBuyingRobot(robot);
        i += 1;
      }
    }
  }

  private getTaskAssignableRobots(
    optionalRobotId?: Nullable<UniqueId>,
  ): Option<Robots> {
    return Option.ofNullable(
      new RobotsFactory().create(
        this.factory
          .getRobots()
          .filter(
            (robot) => ((optionalRobotId ? robot.hasId(optionalRobotId) : true)
                && robot.isIdle())
              || robot.isNew(),
          ),
      ),
    );
  }
}
