import type { WatchedCollection } from './watchedCollection';

export abstract class WatchedCollectionFactory<T> {
  abstract create(values: T[]): WatchedCollection<T>;
}
