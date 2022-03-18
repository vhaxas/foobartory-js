import type {
  InputPort,
  InputPortData,
} from '^shared/application/inputPort.interface';

export interface SellFoobarTaskInput extends InputPortData {
  factoryId: string | number;
  robotId?: string | number;
  taskId?: string | number;
}

export type SellFoobarTaskInputPort = InputPort<SellFoobarTaskInput>;
