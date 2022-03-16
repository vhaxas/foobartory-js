import { InputPortData } from '^shared/application/inputPort.interface';
import { OutputPort } from '^shared/application/outputPort.interface';
import type { UniqueId } from '^shared/domain/uniqueId';

import type { FactoryAppErrorBase } from '../errors/factory.appError';

export interface StartFactoryOutput extends InputPortData {
  id: UniqueId;
}

export type StartFactoryOutputPort = OutputPort<
FactoryAppErrorBase,
StartFactoryOutput
>;
