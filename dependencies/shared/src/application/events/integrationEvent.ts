import { Event } from '../../core/event';
import { EventBase } from '../../core/event.interface';
import { EventType } from '../../core/eventType';
import { Interactor } from '../interactor';
import type { IIntegrationEvent } from './integrationEvent.interface';

@Event(EventType.INTEGRATION, Interactor)
export class IntegrationEvent extends EventBase<IIntegrationEvent> {}
