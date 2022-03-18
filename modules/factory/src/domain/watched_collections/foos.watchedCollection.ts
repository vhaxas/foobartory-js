import { WatchedCollection } from '^shared/domain/watchedCollection';

import type { Foo } from '../entities/foo.entity';

export class Foos extends WatchedCollection<Foo> {
  // eslint-disable-next-line class-methods-use-this
  protected compareItems(a: Foo, b: Foo): boolean {
    return a.equals(b);
  }
}
