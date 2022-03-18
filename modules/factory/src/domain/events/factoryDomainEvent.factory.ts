import type { Factory } from '../aggregates/factory.aggregate';
import type { Bar } from '../entities/bar.entity';
import type { Foo } from '../entities/foo.entity';
import type { Foobar } from '../entities/foobar.entity';
import type { Robot } from '../entities/robot.entity';
import type { Task } from '../entities/task.entity';
import { BarAddedFactoryDomainEvent } from './barAdded.event';
import { FactoryCreatedFactoryDomainEvent } from './factoryCreated.event';
import { FooAddedFactoryDomainEvent } from './fooAdded.event';
import { FoobarAddedFactoryDomainEvent } from './foobarAdded.event';
import { RobotAddedFactoryDomainEvent } from './robotAdded.event';
import { TaskAddedFactoryDomainEvent } from './taskAdded.event';

export abstract class FactoryDomainEventFactory {
  static factoryCreated(factory: Factory): FactoryCreatedFactoryDomainEvent {
    return new FactoryCreatedFactoryDomainEvent(factory);
  }

  static robotAdded(
    factory: Factory,
    robot: Robot,
  ): RobotAddedFactoryDomainEvent {
    return new RobotAddedFactoryDomainEvent(factory, robot);
  }

  static fooAdded(factory: Factory, foo: Foo): FooAddedFactoryDomainEvent {
    return new FooAddedFactoryDomainEvent(factory, foo);
  }

  static barAdded(factory: Factory, bar: Bar): BarAddedFactoryDomainEvent {
    return new BarAddedFactoryDomainEvent(factory, bar);
  }

  static foobarAdded(
    factory: Factory,
    foobar: Foobar,
  ): FoobarAddedFactoryDomainEvent {
    return new FoobarAddedFactoryDomainEvent(factory, foobar);
  }

  static taskAdded(factory: Factory, task: Task): TaskAddedFactoryDomainEvent {
    return new TaskAddedFactoryDomainEvent(factory, task);
  }
}
