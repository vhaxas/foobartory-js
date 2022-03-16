export class Unit {
  static readonly instance = new Unit();
}

export function unit(): Unit {
  return Unit.instance;
}
