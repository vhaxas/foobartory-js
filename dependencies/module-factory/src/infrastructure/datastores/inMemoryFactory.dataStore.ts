import { Option } from '^shared/core/option';
import { DomainEvent } from '^shared/domain/events/domainEvent';
import type { UniqueId } from '^shared/domain/uniqueId';

import type { Factory } from '../../domain/aggregates/factory.aggregate';
import { IFactoryDataStore } from '../../domain/datastores/factoryDataStore.interface';

export class InMemoryFactoryDataStore implements IFactoryDataStore {
  private factories: Factory[] = [];

  async save(factory: Factory) {
    if (await this.contains(factory)) {
      return this.update(factory);
    }
    return this.create(factory);
  }

  async findById(id: UniqueId) {
    return Option.ofNullable(
      this.factories.find((factory) => factory.hasId(id)),
    );
  }

  async contains(factory: Factory) {
    return (await this.findById(factory.id)).isPresent;
  }

  private async create(factory: Factory) {
    this.factories.push(factory);
    this.hooks(factory);
  }

  private async update(factory: Factory) {
    const index = this.factories.findIndex((v) => v.equals(factory));
    if (index >= 0) {
      this.factories.splice(index, 1, factory);
      this.hooks(factory);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  private hooks(factory: Factory) {
    DomainEvent.dispatch(factory.id);
  }
}
