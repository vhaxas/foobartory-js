import { WatchedCollectionFactory } from '^shared/domain/watchedCollectionFactory.interface';

import type { Foo } from '../../entities/foo.entity';
import { Foos } from '../foos.watchedCollection';

export class FoosFactory extends WatchedCollectionFactory<Foo> {
  // eslint-disable-next-line class-methods-use-this
  create(foos?: Foo[]): Foos {
    return new Foos(foos || []);
  }
}
