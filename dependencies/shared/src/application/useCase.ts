import type { Nullable } from '../core/types';
import { UniqueId } from '../domain/uniqueId';
import { IntegrationEvent } from './events/integrationEvent';
import type { IIntegrationEvent } from './events/integrationEvent.interface';
import type { InputPort } from './inputPort.interface';

export abstract class UseCase<
  I extends InputPort = InputPort<Record<string, unknown>>,
> {
  readonly id: UniqueId;

  protected events: IIntegrationEvent[] = [];

  constructor(id?: Nullable<UniqueId>) {
    this.id = id || new UniqueId();
  }

  abstract execute(inputPort: I): Promise<void>;

  public equals(object?: Nullable<UseCase<I>>): boolean {
    if (object === null || object === undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!(object instanceof UseCase)) {
      return false;
    }

    return this.hasId(object.id);
  }

  hasId(id: UniqueId): boolean {
    return this.id.equals(id);
  }

  getEvents(): IIntegrationEvent[] {
    return this.events;
  }

  clearEvents(): void {
    this.events.splice(0, this.events.length);
  }

  addIntegrationEvent(integrationEvent: IIntegrationEvent): void {
    this.events.push(integrationEvent);
    IntegrationEvent.markForDispatch(this);
    IntegrationEvent.dispatch(this.id);
    // this.logIntegrationEventAdded(integrationEvent);
  }

  private logIntegrationEventAdded(integrationEvent: IIntegrationEvent): void {
    const thisClass = Reflect.getPrototypeOf(this);
    const integrationEventClass = Reflect.getPrototypeOf(integrationEvent);
    if (thisClass !== null && integrationEventClass !== null) {
      console.info(
        '[Integration Event Created]',
        thisClass.constructor.name,
        '==>',
        integrationEventClass.constructor.name,
      );
    }
  }
}
