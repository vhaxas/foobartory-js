import { WatchedCollectionFactory } from '^shared/domain/watchedCollectionFactory.interface';

import type { Task } from '../../entities/task.entity';
import { Tasks } from '../tasks.watchedCollection';

export class TasksFactory extends WatchedCollectionFactory<Task> {
  // eslint-disable-next-line class-methods-use-this
  create(tasks?: Task[]): Tasks {
    return new Tasks(tasks || []);
  }
}
