import type { Nullable } from '^shared/core/types';
import { Entity } from '^shared/domain/entity';

import type { Foobar } from './foobar.entity';

// eslint-disable-next-line no-shadow
enum BarStatus {
  AVAILABLE = 'available',
  USED = 'used',
}

// eslint-disable-next-line no-shadow
enum BarUsage {
  ASSEMBLE_FOOBAR = 'AssembleFoobar',
}

export interface BarProps {
  foobar?: Nullable<Foobar>;
}

export class Bar extends Entity<BarProps> {
  private status: BarStatus = BarStatus.AVAILABLE;

  private usage: Nullable<BarUsage> = null;

  isAvailable() {
    return this.status === BarStatus.AVAILABLE;
  }

  available() {
    this.status = BarStatus.AVAILABLE;
    this.usage = null;
    this.props.foobar = null;
  }

  usedForAssemblingFoobar(foobar: Foobar) {
    this.status = BarStatus.USED;
    this.usage = BarUsage.ASSEMBLE_FOOBAR;
    this.props.foobar = foobar;
  }
}
