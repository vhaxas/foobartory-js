import type { Option } from '^shared/core/option';
import type { UniqueId } from '^shared/domain/uniqueId';

import type { Factory } from '../aggregates/factory.aggregate';

export interface IFactoryDataStore {
  save(factory: Factory): Promise<void>;
  findById(id: UniqueId): Promise<Option<Factory>>;
  contains(factory: Factory): Promise<boolean>;
}
