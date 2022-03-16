import type {
  InputPort,
  InputPortData,
} from '^shared/application/inputPort.interface';

export interface StopFactoryInput extends InputPortData {
  factoryId: string | number;
}

export type StopFactoryInputPort = InputPort<StopFactoryInput>;
