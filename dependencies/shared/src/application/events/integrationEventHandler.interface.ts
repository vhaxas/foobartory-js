import type { Constructor } from '../../core/types';
import type { InputPort, InputPortData } from '../inputPort.interface';
import type { InputPortFactory } from '../inputPortFactory.interface';
import type { UseCase } from '../useCase';
import { IntegrationEvent } from './integrationEvent';
import type { IIntegrationEvent } from './integrationEvent.interface';

export abstract class IntegrationEventHandler<
  E extends IIntegrationEvent,
  I extends InputPortData,
  U extends UseCase<InputPort<I>>,
> {
  constructor(
    private readonly eventCls: Constructor<E>,
    private readonly inputPortFactory: InputPortFactory<InputPort<I>, E>,
    protected readonly useCase: U,
  ) {
    this.setupSubscriptions();
  }

  // eslint-disable-next-line max-len
  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars, no-unused-vars, no-empty-function
  protected async onSuccess(event: E): Promise<void> {}

  // eslint-disable-next-line max-len
  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars, no-unused-vars, no-empty-function
  protected async onError(event: E, error: Error): Promise<void> {}

  // eslint-disable-next-line max-len
  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars, no-unused-vars, no-empty-function
  protected async onStart(event: E) {}

  // eslint-disable-next-line max-len
  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars, no-unused-vars
  protected async runIf(event: E) {
    return true;
  }

  private setupSubscriptions(): void {
    IntegrationEvent.register<E>(this.eventCls.name, this.onEvent.bind(this));
  }

  private async onEvent(event: E) {
    if (await this.runIf(event)) {
      await this.onStart(event);
      try {
        this.useCase.execute(this.inputPortFactory.fromIntegrationEvent(event));
        await this.onSuccess(event);
      } catch (err) {
        await this.onError(event, <Error>err);
      }
    }
  }
}
