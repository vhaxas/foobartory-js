import { v4 as uuid } from 'uuid';

import { Identifier } from './identifier';

export class UniqueId extends Identifier<string | number> {
  constructor(id?: string | number) {
    super(id || uuid());
  }

  static fromUniqueId(id: string | number): UniqueId {
    return new UniqueId(id);
  }

  static fromUniqueString(id: string): UniqueId {
    return new UniqueId(id);
  }
}
