import { AssembleFoobarTaskFailed } from './assembleFoobarTaskFailed.event';
import { AssembleFoobarTaskSucceeded } from './assembleFoobarTaskSucceeded.event';
import { AssignTaskFailed } from './assignTaskFailed.event';
import { AssignTaskSucceeded } from './assignTaskSucceeded.event';
import { BuyRobotTaskFailed } from './buyRobotTaskFailed.event';
import { BuyRobotTaskSucceeded } from './buyRobotTaskSucceeded.event';
import { MineBarTaskFailed } from './mineBarTaskFailed.event';
import { MineBarTaskSucceeded } from './mineBarTaskSucceeded.event';
import { MineFooTaskFailed } from './mineFooTaskFailed.event';
import { MineFooTaskSucceeded } from './mineFooTaskSucceeded.event';
import { MoveRobotToWorkstationFailed } from './moveRobotToWorkstationFailed.event';
import { MoveRobotToWorkstationSucceeded } from './moveRobotToWorkstationSucceeded.event';
import { SellFoobarTaskFailed } from './sellFoobarTaskFailed.event';
import { SellFoobarTaskSucceeded } from './sellFoobarTaskSucceeded.event';
import { StartFactoryFailed } from './startFactoryFailed.event';
import { StartFactorySucceeded } from './startFactorySucceeded.event';
import { StopFactoryFailed } from './stopFactoryFailed.event';
import { StopFactorySucceeded } from './stopFactorySucceeded.event';

export abstract class FactoryEventFactory {
  static startFactorySucceeded(factoryId: string | number) {
    return new StartFactorySucceeded({ factoryId });
  }

  static startFactoryFailed() {
    return new StartFactoryFailed();
  }

  static stopFactorySucceeded(factoryId: string | number) {
    return new StopFactorySucceeded({ factoryId });
  }

  static stopFactoryFailed() {
    return new StopFactoryFailed();
  }

  static moveRobotToWorkstationSucceeded(
    factoryId: string | number,
    robotId: string | number,
    taskId?: string | number,
  ) {
    return new MoveRobotToWorkstationSucceeded({ factoryId, robotId, taskId });
  }

  static moveRobotToWorkstationFailed() {
    return new MoveRobotToWorkstationFailed();
  }

  static mineFooTaskSucceeded(
    factoryId: string | number,
    fooId: string | number,
    robotId?: string | number,
  ) {
    return new MineFooTaskSucceeded({ factoryId, robotId, fooId });
  }

  static mineFooTaskFailed(
    factoryId: string | number,
    robotId?: string | number,
    taskId?: string | number,
  ) {
    return new MineFooTaskFailed({ factoryId, robotId, taskId });
  }

  static mineBarTaskSucceeded(
    factoryId: string | number,
    barId: string | number,
    robotId?: string | number,
  ) {
    return new MineBarTaskSucceeded({ factoryId, robotId, barId });
  }

  static mineBarTaskFailed(
    factoryId: string | number,
    robotId?: string | number,
    taskId?: string | number,
  ) {
    return new MineBarTaskFailed({ factoryId, robotId, taskId });
  }

  static assembleFoobarTaskSucceeded(
    factoryId: string | number,
    foobarId: string | number,
    robotId?: string | number,
  ) {
    return new AssembleFoobarTaskSucceeded({ factoryId, robotId, foobarId });
  }

  static assembleFoobarTaskFailed(
    factoryId: string | number,
    robotId?: string | number,
    taskId?: string | number,
  ) {
    return new AssembleFoobarTaskFailed({ factoryId, robotId, taskId });
  }

  static sellFoobarTaskSucceeded(
    factoryId: string | number,
    foobarIds: (string | number)[],
    robotId?: string | number,
  ) {
    return new SellFoobarTaskSucceeded({ factoryId, robotId, foobarIds });
  }

  static sellFoobarTaskFailed(
    factoryId: string | number,
    robotId?: string | number,
    taskId?: string | number,
  ) {
    return new SellFoobarTaskFailed({ factoryId, robotId, taskId });
  }

  static buyRobotTaskSucceeded(
    factoryId: string | number,
    newRobotId: string | number,
    robotId?: string | number,
  ) {
    return new BuyRobotTaskSucceeded({ factoryId, newRobotId, robotId });
  }

  static buyRobotTaskFailed(
    factoryId: string | number,
    robotId?: string | number,
    taskId?: string | number,
  ) {
    return new BuyRobotTaskFailed({ factoryId, robotId, taskId });
  }

  static assignTaskSucceeded(
    factoryId: string | number,
    robotId: string | number,
    taskId: string | number,
  ) {
    return new AssignTaskSucceeded({ factoryId, robotId, taskId });
  }

  static assignTaskFailed() {
    return new AssignTaskFailed();
  }
}
