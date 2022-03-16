import { WatchedCollectionFactory } from '^shared/domain/watchedCollectionFactory.interface';

import type { Robot } from '../../entities/robot.entity';
import { Robots } from '../robots.watchedCollection';

export class RobotsFactory extends WatchedCollectionFactory<Robot> {
  // eslint-disable-next-line class-methods-use-this
  create(robots?: Robot[]): Robots {
    return new Robots(robots || []);
  }
}
