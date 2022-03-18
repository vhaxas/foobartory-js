import { Entity } from '^shared/domain/entity';

// eslint-disable-next-line no-shadow
export enum TaskName {
  MINE_FOO = 'MineFoo',
  MINE_BAR = 'MineBar',
  ASSEMBLE_FOOBAR = 'AssembleFoobar',
  SELL_FOOBAR = 'SellFoobar',
  BUY_ROBOT = 'BuyRobot',
}

export interface TaskProps {
  name: TaskName;
}

export class Task extends Entity<TaskProps> {
  private readonly date: Date = new Date();

  hasName(name: string) {
    return this.getName() === name;
  }

  getName(): string {
    return this.props.name.valueOf();
  }
}
