import type { UniqueId } from '../domain/uniqueId';
import type { EventType } from './eventType';
import type { AbstractConstructor, Constructor, Nullable } from './types';

// eslint-disable-next-line symbol-description
const handlersMapSymbol = Symbol();

// eslint-disable-next-line symbol-description
const markedObjectsSymbol = Symbol();

// eslint-disable-next-line symbol-description
const findMarkedById = Symbol();

// eslint-disable-next-line symbol-description
const dispatchEvents = Symbol();

// eslint-disable-next-line symbol-description
const removeFromMarkedDispatchList = Symbol();

export function Event(
  eventType: EventType,
  ObjectCls: AbstractConstructor<{ readonly id: UniqueId }>,
) {
  // eslint-disable-next-line func-names
  return function <T extends Constructor> (constructor: T) {
    const resultCls = class extends constructor {
      static clear() {
        if (
          this.prototype[markedObjectsSymbol]
          // eslint-disable-next-line no-prototype-builtins
          && this.prototype[markedObjectsSymbol].hasOwnProperty(eventType)
        ) {
          this.prototype[markedObjectsSymbol][eventType] = [];
        }
        if (
          this.prototype[handlersMapSymbol]
          // eslint-disable-next-line no-prototype-builtins
          && this.prototype[handlersMapSymbol].hasOwnProperty(eventType)
        ) {
          this.prototype[handlersMapSymbol][eventType] = {};
        }
      }

      static markForDispatch(obj: { readonly id: UniqueId }) {
        const objFound = !!this.prototype[findMarkedById](obj.id);
        if (!objFound) {
          if (!this.prototype[markedObjectsSymbol]) {
            this.prototype[markedObjectsSymbol] = {};
          }
          if (
            // eslint-disable-next-line no-prototype-builtins
            !this.prototype[markedObjectsSymbol].hasOwnProperty(eventType)
          ) {
            this.prototype[markedObjectsSymbol][eventType] = [];
          }
          this.prototype[markedObjectsSymbol][eventType].push(obj);
        }
      }

      static register<U>(eventClassName: string, callback: (event: U) => void) {
        if (!this.prototype[handlersMapSymbol]) {
          this.prototype[handlersMapSymbol] = {};
        }
        // eslint-disable-next-line no-prototype-builtins
        if (!this.prototype[handlersMapSymbol].hasOwnProperty(eventType)) {
          this.prototype[handlersMapSymbol][eventType] = {};
        }
        if (
          // eslint-disable-next-line no-prototype-builtins
          !this.prototype[handlersMapSymbol][eventType].hasOwnProperty(
            eventClassName,
          )
        ) {
          this.prototype[handlersMapSymbol][eventType][eventClassName] = [];
        }
        this.prototype[handlersMapSymbol][eventType][eventClassName].push(
          callback,
        );
      }

      static dispatch(id: UniqueId) {
        const obj: // eslint-disable-next-line @typescript-eslint/no-explicit-any, max-len
        { clearEvents(): void; getEvents(): any[] } | undefined | null = this.prototype[findMarkedById](id);
        if (obj) {
          this.prototype[dispatchEvents](obj);
          obj.clearEvents();
          this.prototype[removeFromMarkedDispatchList](obj);
        }
      }
    };
    resultCls.prototype[markedObjectsSymbol] = <typeof ObjectCls[]>[];
    resultCls.prototype[findMarkedById] = (
      id: UniqueId,
    ): Nullable<typeof ObjectCls> => {
      let found: Nullable<typeof ObjectCls> = null;
      if (
        resultCls.prototype[markedObjectsSymbol]
        // eslint-disable-next-line no-prototype-builtins
        && resultCls.prototype[markedObjectsSymbol].hasOwnProperty(eventType)
      ) {
        // eslint-disable-next-line no-restricted-syntax
        for (const obj of resultCls.prototype[markedObjectsSymbol][eventType]) {
          if (obj.id.equals(id)) {
            found = obj;
            break;
          }
        }
      }
      return found;
    };
    resultCls.prototype[dispatchEvents] = (obj: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      getEvents(): any[];
    }): void => {
      obj.getEvents().forEach((event: { readonly name: string }) => {
        const eventClassName: string = event.name;
        if (
          resultCls.prototype[handlersMapSymbol]
          // eslint-disable-next-line no-prototype-builtins
          && resultCls.prototype[handlersMapSymbol].hasOwnProperty(eventType)
          // eslint-disable-next-line no-prototype-builtins
          && resultCls.prototype[handlersMapSymbol][eventType].hasOwnProperty(
            eventClassName,
          )
        ) {
          // eslint-disable-next-line no-restricted-syntax
          for (const handler of resultCls.prototype[handlersMapSymbol][
            eventType
          ][eventClassName]) {
            handler(event);
          }
        }
      });
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resultCls.prototype[removeFromMarkedDispatchList] = (obj: any): void => {
      if (
        resultCls.prototype[markedObjectsSymbol]
        // eslint-disable-next-line no-prototype-builtins
        && resultCls.prototype[markedObjectsSymbol].hasOwnProperty(eventType)
      ) {
        const index = resultCls.prototype[markedObjectsSymbol][
          eventType
        ].findIndex(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (a: { equals(o: any): boolean }) => a.equals(obj),
        );
        resultCls.prototype[markedObjectsSymbol][eventType].splice(index, 1);
      }
    };
    return resultCls;
  };
}
