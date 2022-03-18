import { WatchedCollection } from '^shared/domain/watchedCollection';

import { Foobar } from '../entities/foobar.entity';

export class Foobars extends WatchedCollection<Foobar> {
  // eslint-disable-next-line class-methods-use-this
  protected compareItems(a: Foobar, b: Foobar): boolean {
    return a.equals(b);
  }
}
