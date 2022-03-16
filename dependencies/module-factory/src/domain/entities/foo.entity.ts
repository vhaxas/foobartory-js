import type { Nullable } from '^shared/core/types';
import { Entity } from '^shared/domain/entity';

import type { Foobar } from './foobar.entity';
import type { Robot } from './robot.entity';

// eslint-disable-next-line no-shadow
enum FooStatus {
  AVAILABLE = 'available',
  USED = 'used',
  LOST = 'lost',
}

// eslint-disable-next-line no-shadow
enum FooUsage {
  ASSEMBLE_FOOBAR = 'AssembleFoobar',
  BUY_ROBOT = 'BuyRobot',
}

export interface FooProps {
  foobar?: Nullable<Foobar>;
  robot?: Nullable<Robot>;
}

export class Foo extends Entity<FooProps> {
  private status: FooStatus = FooStatus.AVAILABLE;

  private usage: Nullable<FooUsage> = null;

  isAvailable() {
    return this.status === FooStatus.AVAILABLE;
  }

  usedForAssemblingFoobar(foobar: Foobar) {
    this.status = FooStatus.USED;
    this.usage = FooUsage.ASSEMBLE_FOOBAR;
    this.props.foobar = foobar;
  }

  usedForBuyingRobot(robot: Robot) {
    this.status = FooStatus.USED;
    this.usage = FooUsage.BUY_ROBOT;
    this.props.robot = robot;
  }

  lost() {
    this.status = FooStatus.LOST;
  }
}
