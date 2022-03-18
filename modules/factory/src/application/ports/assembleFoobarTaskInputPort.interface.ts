import type {
  InputPort,
  InputPortData,
} from '^shared/application/inputPort.interface';

export interface AssembleFoobarTaskInput extends InputPortData {
  factoryId: string | number;
  robotId?: string | number;
  taskId?: string | number;
}

export type AssembleFoobarTaskInputPort = InputPort<AssembleFoobarTaskInput>;
