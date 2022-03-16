import { Entity } from '^shared/domain/entity';

import type { Bar } from './bar.entity';
import type { Foo } from './foo.entity';

// eslint-disable-next-line no-shadow
enum FoobarStatus {
  DISASSEMBLED = 'disassembled',
  ASSEMBLING = 'assembling',
  LOST = 'lost',
  ASSEMBLED = 'assembled',
  SELLED = 'selled',
}

export interface FoobarProps {
  foo: Foo;
  bar: Bar;
}

export class Foobar extends Entity<FoobarProps> {
  private status: FoobarStatus = FoobarStatus.DISASSEMBLED;

  getFoo() {
    return this.props.foo;
  }

  getBar() {
    return this.props.bar;
  }

  isAssembled() {
    return this.status === FoobarStatus.ASSEMBLED;
  }

  assembling() {
    this.status = FoobarStatus.ASSEMBLING;
  }

  lost() {
    this.status = FoobarStatus.LOST;
  }

  assembled() {
    this.status = FoobarStatus.ASSEMBLED;
  }

  selled() {
    this.status = FoobarStatus.SELLED;
  }
}
