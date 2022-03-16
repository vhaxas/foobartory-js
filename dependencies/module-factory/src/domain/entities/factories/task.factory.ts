import { Result } from '^shared/core/result';
import type { Nullable } from '^shared/core/types';
import { EntityFactory } from '^shared/domain/entity.factory';
import type { UniqueId } from '^shared/domain/uniqueId';

import type { FactoryDomainError } from '../../errors/factory.error';
import { Task } from '../task.entity';
import type { TaskName } from '../task.entity';

export interface TaskFactoryProps {
  name: TaskName;
}

export class TaskFactory
implements EntityFactory<Task, TaskFactoryProps, FactoryDomainError> {
  // eslint-disable-next-line class-methods-use-this
  async create(
    props: TaskFactoryProps,
    id?: Nullable<UniqueId>,
  ): Promise<Result<Nullable<FactoryDomainError>, Nullable<Task>>> {
    const { name } = props;
    const task = new Task({ name }, id);
    return Result.ok(task);
  }
}
