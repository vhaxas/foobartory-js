import { StartFactoryInteractor } from '^module/factory/application/interactors/startFactory.interactor';
import { AssembleFoobarTaskUseCase } from '^module/factory/application/use_cases/assembleFoobarTask.useCase';
import { AssignTaskUseCase } from '^module/factory/application/use_cases/assignTask.useCase';
import { BuyRobotTaskUseCase } from '^module/factory/application/use_cases/buyRobotTask.useCase';
import { MineBarTaskUseCase } from '^module/factory/application/use_cases/mineBarTask.useCase';
import { MineFooTaskUseCase } from '^module/factory/application/use_cases/mineFooTask.useCase';
import { MoveRobotToWorkstationUseCase } from '^module/factory/application/use_cases/moveRobotToWorkstation.useCase';
import { SellFoobarTaskUseCase } from '^module/factory/application/use_cases/sellFoobarTask.useCase';
import { StopFactoryUseCase } from '^module/factory/application/use_cases/stopFactory.useCase';
import { FactoryRepository } from '^module/factory/domain/repositories/factory.repository';
import { ProxyFactoryDataStoreFactory } from '^module/factory/infrastructure/datastores/factories/proxyFactoryDataStore.factory';
import { InMemoryFactoryDataStore } from '^module/factory/infrastructure/datastores/inMemoryFactory.dataStore';
import { AssignTaskAfterAssembleFoobarTaskFailedConsoleEventHandler } from '^module/factory/infrastructure/event_handlers/after_assemble_foobar_task_failed/assignTaskAfterAssembleFoobarTaskFailedEventHandler.console';
import { AssignTaskAfterAssembleFoobarTaskSucceededConsoleEventHandler } from '^module/factory/infrastructure/event_handlers/after_assemble_foobar_task_succeeded/assignTaskAfterAssembleFoobarTaskSucceededEventHandler.console';
import { MoveRobotToWorkstationAfterAssignTaskSucceededConsoleEventHandler } from '^module/factory/infrastructure/event_handlers/after_assign_task_succeeded/moveRobotToWorkstationAfterAssignTaskSucceededEventHandler.console';
import { AssignTaskAfterBuyRobotTaskFailedConsoleEventHandler } from '^module/factory/infrastructure/event_handlers/after_buy_robot_task_failed/assignTaskAfterBuyRobotTaskFailedEventHandler.console';
import { AssignTaskAfterBuyRobotTaskSucceededConsoleEventHandler } from '^module/factory/infrastructure/event_handlers/after_buy_robot_task_succeeded/assignTaskAfterBuyRobotTaskSucceededEventHandler.console';
import { StopFactoryAfterBuyRobotTaskSucceededExitEventHandler } from '^module/factory/infrastructure/event_handlers/after_buy_robot_task_succeeded/stopFactoryAfterBuyRobotTaskSucceededEventHandler.exit';
import { AssignTaskAfterMineBarTaskFailedConsoleEventHandler } from '^module/factory/infrastructure/event_handlers/after_mine_bar_task_failed/assignTaskAfterMineBarTaskFailedEventHandler.console';
import { AssignTaskAfterMineBarTaskSucceededConsoleEventHandler } from '^module/factory/infrastructure/event_handlers/after_mine_bar_task_succeeded/assignTaskAfterMineBarTaskSucceededEventHandler.console';
import { AssignTaskAfterMineFooTaskFailedConsoleEventHandler } from '^module/factory/infrastructure/event_handlers/after_mine_foo_task_failed/assignTaskAfterMineFooTaskFailedEventHandler.console';
import { AssignTaskAfterMineFooTaskSucceededConsoleEventHandler } from '^module/factory/infrastructure/event_handlers/after_mine_foo_task_succeeded/assignTaskAfterMineFooTaskSucceededEventHandler.console';
import { AssembleFoobarTaskAfterMoveRobotToWorkstationSucceededConsoleEventHandler } from '^module/factory/infrastructure/event_handlers/after_move_robot_to_workstation_succeeded/assembleFoobarTaskAfterMoveRobotToWorkstationSucceededEventHandler.console';
import { BuyRobotTaskAfterMoveRobotToWorkstationSucceededConsoleEventHandler } from '^module/factory/infrastructure/event_handlers/after_move_robot_to_workstation_succeeded/buyRobotTaskAfterMoveRobotToWorkstationSucceededEventHandler.console';
import { MineBarTaskAfterMoveRobotToWorkstationSucceededConsoleEventHandler } from '^module/factory/infrastructure/event_handlers/after_move_robot_to_workstation_succeeded/mineBarTaskAfterMoveRobotToWorkstationSucceededEventHandler.console';
import { MineFooTaskAfterMoveRobotToWorkstationSucceededConsoleEventHandler } from '^module/factory/infrastructure/event_handlers/after_move_robot_to_workstation_succeeded/mineFooTaskAfterMoveRobotToWorkstationSucceededEventHandler.console';
import { SellFoobarTaskAfterMoveRobotToWorkstationSucceededConsoleEventHandler } from '^module/factory/infrastructure/event_handlers/after_move_robot_to_workstation_succeeded/sellFoobarTaskAfterMoveRobotToWorkstationSucceededEventHandler.console';
import { AssignTaskAfterSellFoobarTaskFailedConsoleEventHandler } from '^module/factory/infrastructure/event_handlers/after_sell_foobar_task_failed/assignTaskAfterSellFoobarTaskFailedEventHandler.console';
import { AssignTaskAfterSellFoobarTaskSucceededConsoleEventHandler } from '^module/factory/infrastructure/event_handlers/after_sell_foobar_task_succeeded/assignTaskAfterSellFoobarTaskSucceededEventHandler.console';
import { AssignTaskAfterStartFactorySucceededConsoleEventHandler } from '^module/factory/infrastructure/event_handlers/after_start_factory_succeeded/assignTaskAfterStartFactorySucceededEventHandler.console';
import { StopFactoryAfterStartFactorySucceededExitEventHandler } from '^module/factory/infrastructure/event_handlers/after_start_factory_succeeded/stopFactoryAfterStartFactorySucceededEventHandler.exit';
import { initEventHandlers } from '^shared/eventHandler.util';

import { App } from './app';
import initDependencyInjection, { container } from './di';
import { StartFactoryModel } from './models/startFactory.model';
import { StartFactoryViewModel } from './view_models/startFactory.viewModel';

const app = new App();

const WITH_CLOCK = true;

app.on('init', () => {
  initDependencyInjection(({ object, use, value }) => ({
    _input: value({ nbRobots: 2, maxNumberOfRobotsAllowed: 30 }),
    _useClockForMovingRobot: value(WITH_CLOCK),
    _useClockForMiningFoo: value(WITH_CLOCK),
    _useClockForMiningBar: value(WITH_CLOCK),
    _assembleFoobarTaskUseCaseOptions: value({ withClock: WITH_CLOCK }),
    _sellFoobarTaskUseCaseOptions: value({ withClock: WITH_CLOCK }),
    _useClockForBuyingRobot: value(WITH_CLOCK),
    StartFactoryInputPort: object(StartFactoryModel).construct(use('_input')),
    StartFactoryOutputPort: object(StartFactoryViewModel),
    StartFactoryInteractor: object(StartFactoryInteractor).construct(
      use('StartFactoryOutputPort'),
      use('FactoryRepository'),
    ),
    FactoryRepository: object(FactoryRepository).construct(
      use('IFactoryDataStoreFactory'),
    ),
    IFactoryDataStoreFactory: object(ProxyFactoryDataStoreFactory).construct(
      use('IFactoryDataStore'),
    ),
    IFactoryDataStore: object(InMemoryFactoryDataStore),
    AssignTaskUseCase: object(AssignTaskUseCase).construct(
      use('FactoryRepository'),
    ),
    MoveRobotToWorkstationUseCase: object(
      MoveRobotToWorkstationUseCase,
    ).construct(use('FactoryRepository'), use('_useClockForMovingRobot')),
    MineFooTaskUseCase: object(MineFooTaskUseCase).construct(
      use('FactoryRepository'),
      use('_useClockForMiningFoo'),
    ),
    MineBarTaskUseCase: object(MineBarTaskUseCase).construct(
      use('FactoryRepository'),
      use('_useClockForMiningBar'),
    ),
    AssembleFoobarTaskUseCase: object(AssembleFoobarTaskUseCase).construct(
      use('FactoryRepository'),
      use('_assembleFoobarTaskUseCaseOptions'),
    ),
    SellFoobarTaskUseCase: object(SellFoobarTaskUseCase).construct(
      use('FactoryRepository'),
      use('_sellFoobarTaskUseCaseOptions'),
    ),
    BuyRobotTaskUseCase: object(BuyRobotTaskUseCase).construct(
      use('FactoryRepository'),
      use('_useClockForBuyingRobot'),
    ),
    StopFactoryUseCase: object(StopFactoryUseCase).construct(
      use('FactoryRepository'),
    ),
  }));
  initEventHandlers(() => {
    const stopFactoryUseCase = container.get('StopFactoryUseCase');
    const assignTaskUseCase = container.get('AssignTaskUseCase');
    // eslint-disable-next-line no-new
    new AssignTaskAfterStartFactorySucceededConsoleEventHandler(
      assignTaskUseCase,
    );
    // eslint-disable-next-line no-new
    new StopFactoryAfterStartFactorySucceededExitEventHandler(
      stopFactoryUseCase,
    );
    // eslint-disable-next-line no-new
    new MoveRobotToWorkstationAfterAssignTaskSucceededConsoleEventHandler(
      container.get('MoveRobotToWorkstationUseCase'),
    );
    // eslint-disable-next-line no-new
    new MineFooTaskAfterMoveRobotToWorkstationSucceededConsoleEventHandler(
      container.get('MineFooTaskUseCase'),
    );
    // eslint-disable-next-line no-new
    new MineBarTaskAfterMoveRobotToWorkstationSucceededConsoleEventHandler(
      container.get('MineBarTaskUseCase'),
    );
    // eslint-disable-next-line no-new
    new AssembleFoobarTaskAfterMoveRobotToWorkstationSucceededConsoleEventHandler(
      container.get('AssembleFoobarTaskUseCase'),
    );
    // eslint-disable-next-line no-new
    new SellFoobarTaskAfterMoveRobotToWorkstationSucceededConsoleEventHandler(
      container.get('SellFoobarTaskUseCase'),
    );
    // eslint-disable-next-line no-new
    new BuyRobotTaskAfterMoveRobotToWorkstationSucceededConsoleEventHandler(
      container.get('BuyRobotTaskUseCase'),
    );
    // eslint-disable-next-line no-new
    new AssignTaskAfterMineFooTaskSucceededConsoleEventHandler(
      assignTaskUseCase,
    );
    // eslint-disable-next-line no-new
    new AssignTaskAfterMineFooTaskFailedConsoleEventHandler(assignTaskUseCase);
    // eslint-disable-next-line no-new
    new AssignTaskAfterMineBarTaskSucceededConsoleEventHandler(
      assignTaskUseCase,
    );
    // eslint-disable-next-line no-new
    new AssignTaskAfterMineBarTaskFailedConsoleEventHandler(assignTaskUseCase);
    // eslint-disable-next-line no-new
    new AssignTaskAfterAssembleFoobarTaskSucceededConsoleEventHandler(
      assignTaskUseCase,
    );
    // eslint-disable-next-line no-new
    new AssignTaskAfterAssembleFoobarTaskFailedConsoleEventHandler(
      assignTaskUseCase,
    );
    // eslint-disable-next-line no-new
    new AssignTaskAfterSellFoobarTaskSucceededConsoleEventHandler(
      assignTaskUseCase,
    );
    // eslint-disable-next-line no-new
    new AssignTaskAfterSellFoobarTaskFailedConsoleEventHandler(
      assignTaskUseCase,
    );
    // eslint-disable-next-line no-new
    new AssignTaskAfterBuyRobotTaskSucceededConsoleEventHandler(
      assignTaskUseCase,
    );
    // eslint-disable-next-line no-new
    new AssignTaskAfterBuyRobotTaskFailedConsoleEventHandler(assignTaskUseCase);
    // eslint-disable-next-line no-new
    new StopFactoryAfterBuyRobotTaskSucceededExitEventHandler(
      stopFactoryUseCase,
    );
  });
});

app.run(async () => {
  await container
    .get('StartFactoryInteractor')
    .execute(container.get('StartFactoryInputPort'));
});
