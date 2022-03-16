import type { Result } from '../core/result';
import type { Nullable, PromiseOr } from '../core/types';
import type { DomainError } from './error';
import type { UniqueId } from './uniqueId';

export interface EntityFactory<En, P, Er extends DomainError> {
  create(
    props: P,
    id?: Nullable<UniqueId>,
  ): PromiseOr<Result<Nullable<Er>, Nullable<En>>>;
}
