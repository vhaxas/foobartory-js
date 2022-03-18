import { WatchedCollection } from '^shared/domain/watchedCollection';

import type { Task } from '../entities/task.entity';

export class Tasks extends WatchedCollection<Task> {
  // eslint-disable-next-line class-methods-use-this
  protected compareItems(a: Task, b: Task): boolean {
    return a.equals(b);
  }
}
