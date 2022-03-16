/* eslint-disable max-classes-per-file */
export type Randomizer = typeof Math.random;

export function randomInt(min: number, max: number, randomizer?: Randomizer) {
  // eslint-disable-next-line no-param-reassign
  min = Math.ceil(min);
  // eslint-disable-next-line no-param-reassign
  max = Math.floor(max);
  // eslint-disable-next-line no-param-reassign
  randomizer = randomizer ?? Math.random;
  return Math.floor(randomizer() * (max - min + 1)) + min;
}

export class DiceRoller {
  protected readonly randomizer: Randomizer;

  constructor(private readonly max: number, randomizer?: Randomizer) {
    this.randomizer = randomizer || Math.random;
  }

  roll(min?: number): number {
    return randomInt(min || 0, this.max, this.randomizer);
  }
}

export class DeterministicDiceRoller extends DiceRoller {
  constructor(private readonly deterministicValue: number) {
    super(Number.MAX_SAFE_INTEGER);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  roll(min?: number): number {
    return this.deterministicValue;
  }
}

export class Gambler {
  protected readonly randomizer: Randomizer;

  constructor(private readonly successRate: number, randomizer?: Randomizer) {
    if (successRate < 0 || successRate > 1) {
      throw new Error('Success rate should be a number in interval [0, 1]');
    }
    this.randomizer = randomizer || Math.random;
  }

  gamble(): boolean {
    return this.randomizer() < this.successRate;
  }
}

export class DeterministicGambler extends Gambler {
  constructor(private readonly deterministicValue: boolean) {
    super(0);
  }

  gamble(): boolean {
    return this.deterministicValue;
  }
}

export class LuckyGambler extends DeterministicGambler {
  constructor() {
    super(true);
  }
}

export class UnluckyGambler extends DeterministicGambler {
  constructor() {
    super(false);
  }
}

/* eslint-enable max-classes-per-file */
