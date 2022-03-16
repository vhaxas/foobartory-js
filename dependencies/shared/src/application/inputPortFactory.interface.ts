import type { IIntegrationEvent } from './events/integrationEvent.interface';
import type { InputPort } from './inputPort.interface';

export interface InputPortFactory<
  I extends InputPort,
  E extends IIntegrationEvent,
> {
  fromIntegrationEvent(event: E): I;
}
