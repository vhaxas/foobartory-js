import { WatchedCollectionFactory } from '^shared/domain/watchedCollectionFactory.interface';

import type { Bar } from '../../entities/bar.entity';
import { Bars } from '../bars.watchedCollection';

export class BarsFactory extends WatchedCollectionFactory<Bar> {
  // eslint-disable-next-line class-methods-use-this
  create(bars?: Bar[]): Bars {
    return new Bars(bars || []);
  }
}
