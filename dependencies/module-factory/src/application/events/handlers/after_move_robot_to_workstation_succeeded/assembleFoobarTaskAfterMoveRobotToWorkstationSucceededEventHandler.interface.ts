/* eslint-disable max-classes-per-file */
import { InputPortFactory } from '^shared/application/inputPortFactory.interface';
import type { Option } from '^shared/core/option';
import { UniqueId } from '^shared/domain/uniqueId';

import type { Factory } from '../../../../domain/aggregates/factory.aggregate';
import { TaskName } from '../../../../domain/entities/task.entity';
import type {
  AssembleFoobarTaskInput,
  AssembleFoobarTaskInputPort,
} from '../../../ports/assembleFoobarTaskInputPort.interface';
import { AssembleFoobarTaskUseCase } from '../../../use_cases/assembleFoobarTask.useCase';
import type { MoveRobotToWorkstationSucceeded } from '../../moveRobotToWorkstationSucceeded.event';
import { MoveRobotToWorkstationSucceededEventHandler } from '../moveRobotToWorkstationSucceededEventHandler.interface';

class InputPortImpl implements AssembleFoobarTaskInputPort {
  // eslint-disable-next-line no-useless-constructor, no-empty-function
  constructor(readonly data: AssembleFoobarTaskInput) {}
}

class InputPortFactoryImpl
implements
    InputPortFactory<
    AssembleFoobarTaskInputPort,
    MoveRobotToWorkstationSucceeded
    > {
  // eslint-disable-next-line class-methods-use-this
  fromIntegrationEvent(
    event: MoveRobotToWorkstationSucceeded,
  ): AssembleFoobarTaskInputPort {
    const {
      data: { factoryId, robotId, taskId },
    } = event;
    return new InputPortImpl({ factoryId, robotId, taskId });
  }
}

// eslint-disable-next-line max-len
export abstract class AssembleFoobarTaskAfterMoveRobotToWorkstationSucceededEventHandler extends MoveRobotToWorkstationSucceededEventHandler<
AssembleFoobarTaskInput,
AssembleFoobarTaskUseCase
> {
  constructor(useCase: AssembleFoobarTaskUseCase) {
    super(new InputPortFactoryImpl(), useCase);
  }

  protected async runIf(event: MoveRobotToWorkstationSucceeded) {
    const factoryEither = await this.useCase.factoryRepository.findById(
      UniqueId.fromUniqueId(event.data.factoryId),
    );
    if (factoryEither.isRight) {
      const optionalFactory = <Option<Factory>>factoryEither.value;
      if (optionalFactory.isPresent) {
        const factory = optionalFactory.get();
        const optionalRobot = factory.getRobot(
          UniqueId.fromUniqueId(event.data.robotId),
        );
        if (optionalRobot.isPresent) {
          const robot = optionalRobot.get();
          const assignedTask = robot.getAssignedTask();
          if (assignedTask && event.data.taskId) {
            const optionalTask = factory.getTask(
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              UniqueId.fromUniqueId(event.data.taskId!),
            );
            if (optionalTask.isPresent) {
              const task = optionalTask.get();
              return (
                assignedTask.equals(task)
                && assignedTask.hasName(TaskName.ASSEMBLE_FOOBAR)
              );
            }
          }
        }
      }
    }
    return false;
  }
}
/* eslint-enable max-classes-per-file */
