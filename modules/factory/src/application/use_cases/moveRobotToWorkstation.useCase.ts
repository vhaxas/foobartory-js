import { UseCase } from '^shared/application/useCase';
import type { Option } from '^shared/core/option';
import { UniqueId } from '^shared/domain/uniqueId';

import type { Factory } from '../../domain/aggregates/factory.aggregate';
import type { FactoryRepository } from '../../domain/repositories/factory.repository';
import { FactoryService } from '../../domain/services/factory.service';
import { FactoryEventFactory } from '../events/event.factory';
import type { MoveRobotToWorkstationInputPort } from '../ports/moveRobotToWorkstationInputPort.interface';

export class MoveRobotToWorkstationUseCase extends UseCase<MoveRobotToWorkstationInputPort> {
  constructor(
    private readonly factoryRepository: FactoryRepository,
    private readonly withClock?: boolean,
  ) {
    super();
  }

  async execute(inputPort: MoveRobotToWorkstationInputPort) {
    const factoryEither = await this.factoryRepository.findById(
      UniqueId.fromUniqueId(inputPort.data.factoryId),
    );
    if (factoryEither.isRight) {
      const optionalFactory = <Option<Factory>>factoryEither.value;
      if (optionalFactory.isPresent) {
        const factory = optionalFactory.get();
        const optionalHasMoved = await new FactoryService(
          factory,
        ).moveRobotToWorkstation(UniqueId.fromUniqueId(inputPort.data.robotId));
        if (optionalHasMoved.isPresent) {
          const hasMoved = optionalHasMoved.get();
          if (hasMoved !== null) {
            const optionalRobot = factory.getRobot(
              UniqueId.fromUniqueId(inputPort.data.robotId),
            );
            if (optionalRobot.isPresent) {
              const robot = optionalRobot.get();
              const updateEither = await this.factoryRepository.update(factory);
              if (updateEither.isRight) {
                const dispatchEvent = () => {
                  this.addIntegrationEvent(
                    FactoryEventFactory.moveRobotToWorkstationSucceeded(
                      factory.id.toValue(),
                      robot.id.toValue(),
                      robot.getAssignedTask()?.id.toValue(),
                    ),
                  );
                };
                if (hasMoved && this.withClock) {
                  setTimeout(dispatchEvent, 5000);
                } else {
                  dispatchEvent();
                }
                return;
              }
            }
          }
        }
      }
    }
    this.addIntegrationEvent(
      FactoryEventFactory.moveRobotToWorkstationFailed(),
    );
  }
}
