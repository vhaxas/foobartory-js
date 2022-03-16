import type {
  InputPort,
  InputPortData,
} from '^shared/application/inputPort.interface';

export interface AssignTaskInput extends InputPortData {
  factoryId: string | number;
  robotId?: string | number;
}

export type AssignTaskInputPort = InputPort<AssignTaskInput>;
