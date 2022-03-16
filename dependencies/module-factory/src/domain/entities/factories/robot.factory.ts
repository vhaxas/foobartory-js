import { Result } from '^shared/core/result';
import type { Nullable } from '^shared/core/types';
import { EntityFactory } from '^shared/domain/entity.factory';
import type { UniqueId } from '^shared/domain/uniqueId';

import type { FactoryDomainError } from '../../errors/factory.error';
import { Robot } from '../robot.entity';
import type { RobotProps } from '../robot.entity';
import type { Task } from '../task.entity';

interface RobotFactoryProps {
  assignedTask?: Task;
}

export class RobotFactory
implements EntityFactory<Robot, RobotFactoryProps, FactoryDomainError> {
  // eslint-disable-next-line class-methods-use-this
  async create(
    props: RobotFactoryProps,
    id?: Nullable<UniqueId>,
  ): Promise<Result<Nullable<FactoryDomainError>, Nullable<Robot>>> {
    const { assignedTask } = props;
    let robotProps: RobotProps = {};
    if (assignedTask) {
      robotProps = {
        ...robotProps,
        nextTask: assignedTask,
      };
    }
    const robot = new Robot(robotProps, id);
    return Result.ok(robot);
  }
}
