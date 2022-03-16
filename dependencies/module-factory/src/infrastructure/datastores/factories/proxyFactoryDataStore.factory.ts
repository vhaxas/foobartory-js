import type { UniqueId } from '^shared/domain/uniqueId';

import type { Factory } from '../../../domain/aggregates/factory.aggregate';
import { IFactoryDataStoreFactory } from '../../../domain/datastores/factories/factoryDataStoreFactory.interface';
import type { IFactoryDataStore } from '../../../domain/datastores/factoryDataStore.interface';

export class ProxyFactoryDataStoreFactory implements IFactoryDataStoreFactory {
  // eslint-disable-next-line no-useless-constructor, no-empty-function
  constructor(private readonly factoryDataStore: IFactoryDataStore) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  fromFactory(factory: Factory): IFactoryDataStore {
    return this.factoryDataStore;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  fromId(id: UniqueId): IFactoryDataStore {
    return this.factoryDataStore;
  }
}
