import { WatchedCollectionFactory } from '^shared/domain/watchedCollectionFactory.interface';

import type { Foobar } from '../../entities/foobar.entity';
import { Foobars } from '../foobars.watchedCollection';

export class FoobarsFactory extends WatchedCollectionFactory<Foobar> {
  // eslint-disable-next-line class-methods-use-this
  create(foobars?: Foobar[]): Foobars {
    return new Foobars(foobars || []);
  }
}
