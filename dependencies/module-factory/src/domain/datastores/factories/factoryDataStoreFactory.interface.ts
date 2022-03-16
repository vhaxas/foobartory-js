import type { UniqueId } from '^shared/domain/uniqueId';

import type { Factory } from '../../aggregates/factory.aggregate';
import type { IFactoryDataStore } from '../factoryDataStore.interface';

export interface IFactoryDataStoreFactory {
  fromFactory(factory: Factory): IFactoryDataStore;
  fromId(id: UniqueId): IFactoryDataStore;
}
