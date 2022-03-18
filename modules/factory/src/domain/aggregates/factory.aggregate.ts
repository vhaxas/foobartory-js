import { Option } from '^shared/core/option';
import { Result } from '^shared/core/result';
import type { Nullable } from '^shared/core/types';
import { unit } from '^shared/core/unit';
import type { Unit } from '^shared/core/unit';
import { AggregateRoot } from '^shared/domain/aggregateRoot';
import type { UniqueId } from '^shared/domain/uniqueId';

import type { Bar } from '../entities/bar.entity';
import type { Foo } from '../entities/foo.entity';
import type { Foobar } from '../entities/foobar.entity';
import type { Robot } from '../entities/robot.entity';
import type { Task } from '../entities/task.entity';
import { FactoryDomainEventFactory } from '../events/factoryDomainEvent.factory';
import type { Bars } from '../watched_collections/bars.watchedCollection';
import type { Foobars } from '../watched_collections/foobars.watchedCollection';
import type { Foos } from '../watched_collections/foos.watchedCollection';
import type { Robots } from '../watched_collections/robots.watchedCollection';
import type { Tasks } from '../watched_collections/tasks.watchedCollection';

// eslint-disable-next-line no-shadow
enum FactoryStatus {
  STOPPED = 'stopped',
  RUNNING = 'running',
}

export interface FactoryProps {
  robots: Robots;
  maxNumberOfRobotsAllowed: number;
  money: number;
  foos: Foos;
  bars: Bars;
  foobars: Foobars;
  tasks: Tasks;
}

export class Factory extends AggregateRoot<FactoryProps> {
  private status: FactoryStatus = FactoryStatus.RUNNING;

  isRunning(): boolean {
    return this.status === FactoryStatus.RUNNING;
  }

  getRobots() {
    return this.props.robots.getItems();
  }

  getRobot(id: UniqueId): Option<Robot> {
    return Option.ofNullable(this.getRobots().find((robot) => robot.hasId(id)));
  }

  getTasks() {
    return this.props.tasks.getItems();
  }

  getTask(id: UniqueId): Option<Task> {
    return Option.ofNullable(this.getTasks().find((task) => task.hasId(id)));
  }

  getNumberOfRobots(): number {
    return this.getRobots().length;
  }

  getMaximumNumberOfRobotsAllowed(): number {
    return this.props.maxNumberOfRobotsAllowed;
  }

  getMoney(): number {
    return this.props.money;
  }

  getFoo(fooId: UniqueId) {
    return Option.ofNullable(
      this.props.foos.getItems().find((foo) => foo.hasId(fooId)),
    );
  }

  getFoos() {
    return this.props.foos.getItems().filter((foo) => foo.isAvailable());
  }

  getNumberOfFoos(): number {
    return this.getFoos().length;
  }

  getBar(barId: UniqueId) {
    return Option.ofNullable(
      this.props.bars.getItems().find((bar) => bar.hasId(barId)),
    );
  }

  getBars() {
    return this.props.bars.getItems().filter((bar) => bar.isAvailable());
  }

  getNumberOfBars(): number {
    return this.getBars().length;
  }

  getFoobar(foobarId: UniqueId) {
    return Option.ofNullable(
      this.props.foobars.getItems().find((foobar) => foobar.hasId(foobarId)),
    );
  }

  getFoobars() {
    return this.props.foobars
      .getItems()
      .filter((foobar) => foobar.isAssembled());
  }

  getNumberOfFoobars(): number {
    return this.getFoobars().length;
  }

  getNumberOfTasks(): number {
    return this.props.tasks.getItems().length;
  }

  getLastAssignedTask(): Option<Task> {
    if (this.getNumberOfTasks() > 0) {
      const tasks = this.props.tasks.getItems();
      const task = tasks[tasks.length - 1];
      return Option.of(task);
    }
    return Option.empty();
  }

  stop() {
    this.status = FactoryStatus.STOPPED;
  }

  addRobot(robot: Robot): Result<null, Unit> {
    this.removeRobotIfExists(robot);
    this.props.robots.add(robot);
    this.addDomainEvent(FactoryDomainEventFactory.robotAdded(this, robot));
    return Result.ok(unit());
  }

  addMoney(money: number): Result<null, Unit> {
    this.props.money += money;
    return Result.ok(unit());
  }

  removeMoney(money: number): Result<null, Unit> {
    this.props.money -= money;
    return Result.ok(unit());
  }

  addFoo(foo: Foo): Result<null, Unit> {
    this.removeFooIfExists(foo);
    this.props.foos.add(foo);
    this.addDomainEvent(FactoryDomainEventFactory.fooAdded(this, foo));
    return Result.ok(unit());
  }

  getRandomFoo(): Option<Foo> {
    let randomFoo: Nullable<Foo> = null;
    if (this.getNumberOfFoos() > 0) {
      [randomFoo] = this.getFoos();
    }
    return Option.ofNullable(randomFoo);
  }

  addBar(bar: Bar): Result<null, Unit> {
    this.removeBarIfExists(bar);
    this.props.bars.add(bar);
    this.addDomainEvent(FactoryDomainEventFactory.barAdded(this, bar));
    return Result.ok(unit());
  }

  getRandomBar(): Option<Bar> {
    let randomBar: Nullable<Bar> = null;
    if (this.getNumberOfBars() > 0) {
      [randomBar] = this.getBars();
    }
    return Option.ofNullable(randomBar);
  }

  addFoobar(foobar: Foobar): Result<null, Unit> {
    this.removeFoobarIfExists(foobar);
    this.props.foobars.add(foobar);
    this.addDomainEvent(FactoryDomainEventFactory.foobarAdded(this, foobar));
    return Result.ok(unit());
  }

  getRandomFoobar(): Option<Foobar> {
    let randomFoobar: Nullable<Foobar> = null;
    if (this.getNumberOfFoobars() > 0) {
      [randomFoobar] = this.getFoobars();
    }
    return Option.ofNullable(randomFoobar);
  }

  addTask(task: Task): Result<null, Unit> {
    this.removeTaskIfExists(task);
    this.props.tasks.add(task);
    this.addDomainEvent(FactoryDomainEventFactory.taskAdded(this, task));
    return Result.ok(unit());
  }

  private removeRobotIfExists(robot: Robot): void {
    if (this.props.robots.exists(robot)) {
      this.props.robots.remove(robot);
    }
  }

  private removeFooIfExists(foo: Foo): void {
    if (this.props.foos.exists(foo)) {
      this.props.foos.remove(foo);
    }
  }

  private removeBarIfExists(bar: Bar): void {
    if (this.props.bars.exists(bar)) {
      this.props.bars.remove(bar);
    }
  }

  private removeFoobarIfExists(foobar: Foobar): void {
    if (this.props.foobars.exists(foobar)) {
      this.props.foobars.remove(foobar);
    }
  }

  private removeTaskIfExists(task: Task): void {
    if (this.props.tasks.exists(task)) {
      this.props.tasks.remove(task);
    }
  }
}
