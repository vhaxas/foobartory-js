import { IntegrationEvent } from './application/events/integrationEvent';
import { DomainEvent } from './domain/events/domainEvent';

export function initEventHandlers(callback?: () => void) {
  DomainEvent.clear();
  IntegrationEvent.clear();
  if (callback) {
    callback();
  }
}
