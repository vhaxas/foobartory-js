import { Interactor } from '^shared/application/interactor';
import { PositiveInteger } from '^shared/domain/value_objects/positiveInteger.valueObject';
import { StrictlyPositiveInteger } from '^shared/domain/value_objects/strictlyPositiveInteger.valueObject';

import { FactoryFactory } from '../../domain/aggregates/factories/factory.factory';
import type { Factory } from '../../domain/aggregates/factory.aggregate';
import type { FactoryRepository } from '../../domain/repositories/factory.repository';
import { FactoryAppError } from '../errors/factory.appError';
import { FactoryEventFactory } from '../events/event.factory';
import type { StartFactoryInputPort } from '../ports/startFactoryInputPort.interface';
import type { StartFactoryOutputPort } from '../ports/startFactoryOutputPort.interface';

export class StartFactoryInteractor extends Interactor<
StartFactoryInputPort,
StartFactoryOutputPort
> {
  constructor(
    outputPort: StartFactoryOutputPort,
    private readonly factoryRepository: FactoryRepository,
  ) {
    super(outputPort);
  }

  async execute(inputPort: StartFactoryInputPort): Promise<void> {
    const newFactoryResult = await new FactoryFactory().create({
      nbRobots: new PositiveInteger(inputPort.data.nbRobots),
      maxNumberOfRobotsAllowed: new StrictlyPositiveInteger(
        inputPort.data.maxNumberOfRobotsAllowed,
      ),
    });
    if (newFactoryResult.isOk) {
      const newFactory = <Factory>newFactoryResult.getValue();
      const repositoryAddResult = await this.factoryRepository.add(newFactory);
      if (repositoryAddResult.isRight) {
        this.addIntegrationEvent(
          FactoryEventFactory.startFactorySucceeded(newFactory.id.toValue()),
        );
        return this.outputPort.handle({ id: newFactory.id });
      }
    }
    this.addIntegrationEvent(FactoryEventFactory.startFactoryFailed());
    return this.outputPort.handleError(FactoryAppError.serverError());
  }
}
