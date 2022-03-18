import { Result } from '^shared/core/result';
import type { Nullable } from '^shared/core/types';
import { EntityFactory } from '^shared/domain/entity.factory';
import type { UniqueId } from '^shared/domain/uniqueId';

import type { FactoryDomainError } from '../../errors/factory.error';
import type { Bar } from '../bar.entity';
import type { Foo } from '../foo.entity';
import { Foobar } from '../foobar.entity';
import { BarFactory } from './bar.factory';
import { FooFactory } from './foo.factory';

export interface FoobarFactoryProps {
  foo?: Foo;
  bar?: Bar;
}

export class FoobarFactory
implements EntityFactory<Foobar, FoobarFactoryProps, FactoryDomainError> {
  // eslint-disable-next-line class-methods-use-this
  async create(
    props: FoobarFactoryProps,
    id?: Nullable<UniqueId>,
  ): Promise<Result<Nullable<FactoryDomainError>, Nullable<Foobar>>> {
    const { foo, bar } = props;
    const foobar = new Foobar(
      {
        foo: foo || <Foo>(await new FooFactory().create({})).getValue(),
        bar: bar || <Bar>(await new BarFactory().create({})).getValue(),
      },
      id,
    );
    return Result.ok(foobar);
  }
}
