import type {
  InputPort,
  InputPortData,
} from '^shared/application/inputPort.interface';

export interface MoveRobotToWorkstationInput extends InputPortData {
  factoryId: string | number;
  robotId: string | number;
}

export type MoveRobotToWorkstationInputPort =
  InputPort<MoveRobotToWorkstationInput>;
