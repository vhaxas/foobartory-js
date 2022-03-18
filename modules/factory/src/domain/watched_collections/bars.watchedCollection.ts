import { WatchedCollection } from '^shared/domain/watchedCollection';

import type { Bar } from '../entities/bar.entity';

export class Bars extends WatchedCollection<Bar> {
  // eslint-disable-next-line class-methods-use-this
  protected compareItems(a: Bar, b: Bar): boolean {
    return a.equals(b);
  }
}
