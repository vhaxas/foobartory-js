import { Result } from '^shared/core/result';
import type { Nullable } from '^shared/core/types';
import { EntityFactory } from '^shared/domain/entity.factory';
import type { UniqueId } from '^shared/domain/uniqueId';

import type { FactoryDomainError } from '../../errors/factory.error';
import { Bar } from '../bar.entity';
import type { BarProps } from '../bar.entity';

export class BarFactory
implements EntityFactory<Bar, BarProps, FactoryDomainError> {
  // eslint-disable-next-line class-methods-use-this
  async create(
    props: BarProps,
    id?: Nullable<UniqueId>,
  ): Promise<Result<Nullable<FactoryDomainError>, Nullable<Bar>>> {
    const bar = new Bar({}, id);
    return Result.ok(bar);
  }
}
