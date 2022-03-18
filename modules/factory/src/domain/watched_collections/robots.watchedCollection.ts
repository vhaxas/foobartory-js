import { WatchedCollection } from '^shared/domain/watchedCollection';

import type { Robot } from '../entities/robot.entity';

export class Robots extends WatchedCollection<Robot> {
  // eslint-disable-next-line class-methods-use-this
  protected compareItems(a: Robot, b: Robot): boolean {
    return a.equals(b);
  }
}
