import { Result } from '^shared/core/result';
import type { Nullable } from '^shared/core/types';
import { EntityFactory } from '^shared/domain/entity.factory';
import type { UniqueId } from '^shared/domain/uniqueId';

import type { FactoryDomainError } from '../../errors/factory.error';
import { Foo } from '../foo.entity';
import type { FooProps } from '../foo.entity';

export class FooFactory
implements EntityFactory<Foo, FooProps, FactoryDomainError> {
  // eslint-disable-next-line class-methods-use-this
  async create(
    props: FooProps,
    id?: Nullable<UniqueId>,
  ): Promise<Result<Nullable<FactoryDomainError>, Nullable<Foo>>> {
    const foo = new Foo({}, id);
    return Result.ok(foo);
  }
}
