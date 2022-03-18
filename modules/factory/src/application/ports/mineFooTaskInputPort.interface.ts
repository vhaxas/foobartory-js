import type {
  InputPort,
  InputPortData,
} from '^shared/application/inputPort.interface';

export interface MineFooTaskInput extends InputPortData {
  factoryId: string | number;
  robotId?: string | number;
  taskId?: string | number;
}

export type MineFooTaskInputPort = InputPort<MineFooTaskInput>;
