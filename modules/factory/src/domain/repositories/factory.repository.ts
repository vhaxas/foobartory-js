import { left, right } from '^shared/core/either';
import type { Either } from '^shared/core/either';
import { Option } from '^shared/core/option';
import { unit } from '^shared/core/unit';
import type { Unit } from '^shared/core/unit';
import type { UniqueId } from '^shared/domain/uniqueId';

import type { Factory } from '../aggregates/factory.aggregate';
import type { IFactoryDataStoreFactory } from '../datastores/factories/factoryDataStoreFactory.interface';
import type { FactoryFailure } from '../failures/factory.failure';
import { FactoryFailureFactory } from '../failures/factoryFailure.factory';

export class FactoryRepository {
  private readonly factoryDataStoreFactory: IFactoryDataStoreFactory;

  constructor(factoryDataStoreFactory: IFactoryDataStoreFactory) {
    this.factoryDataStoreFactory = factoryDataStoreFactory;
  }

  async add(factory: Factory): Promise<Either<FactoryFailure, Unit>> {
    try {
      const factoryDataStore = this.factoryDataStoreFactory.fromFactory(factory);
      await factoryDataStore.save(factory);
      return right(unit());
    } catch (error) {
      return left(FactoryFailureFactory.unexpected(<Error>error));
    }
  }

  async findById(
    id: UniqueId,
  ): Promise<Either<FactoryFailure, Option<Factory>>> {
    try {
      const factoryDataStore = this.factoryDataStoreFactory.fromId(id);
      const optionalFactory = await factoryDataStore.findById(id);
      return right(optionalFactory);
    } catch (error) {
      return left(FactoryFailureFactory.unexpected(<Error>error));
    }
  }

  async contains(factory: Factory): Promise<Either<FactoryFailure, boolean>> {
    try {
      const factoryDataStore = this.factoryDataStoreFactory.fromFactory(factory);
      const isFactoryInRepository = await factoryDataStore.contains(factory);
      return right(isFactoryInRepository);
    } catch (error) {
      return left(FactoryFailureFactory.unexpected(<Error>error));
    }
  }

  async update(factory: Factory) {
    return this.add(factory);
  }
}
