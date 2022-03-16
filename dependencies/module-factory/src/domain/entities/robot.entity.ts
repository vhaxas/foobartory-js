import type { Nullable } from '^shared/core/types';
import { Entity } from '^shared/domain/entity';
import type { UniqueId } from '^shared/domain/uniqueId';

import type { Task } from './task.entity';

// eslint-disable-next-line no-shadow
export enum RobotStatus {
  IDLE = 'idle',
  MOVING = 'moving',
  BUSY = 'busy',
}

export interface RobotProps {
  previousTask?: Nullable<Task>;
  currentTask?: Nullable<Task>;
  nextTask?: Nullable<Task>;
}

export class Robot extends Entity<RobotProps> {
  private status: RobotStatus = RobotStatus.IDLE;

  constructor(props: RobotProps, id?: Nullable<UniqueId>) {
    super(props, id);
    if (this.props.currentTask) {
      this.status = RobotStatus.BUSY;
    } else if (this.props.nextTask) {
      this.status = RobotStatus.MOVING;
    }
  }

  isNew(): boolean {
    return (
      this.status === RobotStatus.IDLE
      && !(
        this.getPreviousTask()
        || this.getCurrentTask()
        || this.getAssignedTask()
      )
    );
  }

  isIdle(): boolean {
    return this.status === RobotStatus.IDLE && !this.props.nextTask;
  }

  isMoving(): boolean {
    return this.status === RobotStatus.MOVING;
  }

  isBusy(): boolean {
    return this.isMoving() || this.status === RobotStatus.BUSY;
  }

  getPreviousTask() {
    return this.props.previousTask;
  }

  getAssignedTask() {
    return this.props.nextTask;
  }

  getCurrentTask() {
    return this.props.currentTask;
  }

  idle() {
    this.status = RobotStatus.IDLE;
  }

  move() {
    this.status = RobotStatus.MOVING;
  }

  busy() {
    this.status = RobotStatus.BUSY;
  }

  assignTask(task: Task) {
    this.props.nextTask = task;
    this.idle();
  }

  executeTask() {
    if (this.props.nextTask) {
      this.props.currentTask = this.props.nextTask;
      this.props.nextTask = null;
      this.busy();
    }
  }

  completeTask() {
    if (this.props.currentTask) {
      this.props.previousTask = this.props.currentTask;
      this.props.currentTask = null;
      this.idle();
    }
  }
}
