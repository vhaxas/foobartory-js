import type {
  InputPort,
  InputPortData,
} from '^shared/application/inputPort.interface';

export interface StartFactoryInput extends InputPortData {
  nbRobots: number;
  maxNumberOfRobotsAllowed: number;
}

export type StartFactoryInputPort = InputPort<StartFactoryInput>;
