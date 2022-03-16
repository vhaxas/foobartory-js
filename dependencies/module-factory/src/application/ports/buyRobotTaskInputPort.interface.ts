import type {
  InputPort,
  InputPortData,
} from '^shared/application/inputPort.interface';

export interface BuyRobotTaskInput extends InputPortData {
  factoryId: string | number;
  robotId?: string | number;
  taskId?: string | number;
}

export type BuyRobotTaskInputPort = InputPort<BuyRobotTaskInput>;
