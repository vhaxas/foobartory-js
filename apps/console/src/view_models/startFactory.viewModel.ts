import type { FactoryAppErrorBase } from '^module/factory/application/errors/factory.appError';
import { StartFactoryOutputPort } from '^module/factory/application/ports/startFactoryOutputPort.interface';
import type { StartFactoryOutput } from '^module/factory/application/ports/startFactoryOutputPort.interface';

export class StartFactoryViewModel implements StartFactoryOutputPort {
  private data?: {
    id: string;
  };

  async handle(data: StartFactoryOutput): Promise<void> {
    this.data = { id: data.id.toString() };
  }

  // eslint-disable-next-line class-methods-use-this
  async handleError(error: FactoryAppErrorBase): Promise<void> {
    throw error;
  }
}
