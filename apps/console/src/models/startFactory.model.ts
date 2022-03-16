import { StartFactoryInputPort } from '^module/factory/application/ports/startFactoryInputPort.interface';
import type { StartFactoryInput } from '^module/factory/application/ports/startFactoryInputPort.interface';

export class StartFactoryModel implements StartFactoryInputPort {
  // eslint-disable-next-line no-useless-constructor, no-empty-function
  constructor(readonly data: StartFactoryInput) {}
}
