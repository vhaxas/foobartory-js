import type {
  InputPort,
  InputPortData,
} from '^shared/application/inputPort.interface';

export interface MineBarTaskInput extends InputPortData {
  factoryId: string | number;
  robotId?: string | number;
  taskId?: string | number;
}

export type MineBarTaskInputPort = InputPort<MineBarTaskInput>;
