export abstract class WatchedCollection<T> {
  private currentItems: T[];

  private initial: T[];

  private new: T[];

  private removed: T[];

  constructor(initialItems?: T[]) {
    this.currentItems = initialItems || [];
    this.initial = initialItems || [];
    this.new = [];
    this.removed = [];
  }

  protected abstract compareItems(a: T, b: T): boolean;

  getItems(): T[] {
    return this.currentItems;
  }

  getNewItems(): T[] {
    return this.new;
  }

  getRemovedItems(): T[] {
    return this.removed;
  }

  exists(item: T): boolean {
    return this.isCurrentItem(item);
  }

  add(item: T): void {
    if (this.isRemovedItem(item)) {
      this.removeFromRemoved(item);
    }

    if (!this.isNewItem(item) && !this.wasAddedInitially(item)) {
      this.new.push(item);
    }

    if (!this.isCurrentItem(item)) {
      this.currentItems.push(item);
    }
  }

  remove(item: T): void {
    this.removeFromCurrent(item);

    if (this.isNewItem(item)) {
      this.removeFromNew(item);
      return;
    }

    if (!this.isRemovedItem(item)) {
      this.removed.push(item);
    }
  }

  forEachItems(fn: (value: T, index: number, array: T[]) => void) {
    this.getItems().forEach(fn);
  }

  private isCurrentItem(item: T): boolean {
    return (
      this.currentItems.filter((v: T) => this.compareItems(item, v)).length
      !== 0
    );
  }

  private isNewItem(item: T): boolean {
    return this.new.filter((v: T) => this.compareItems(item, v)).length !== 0;
  }

  private isRemovedItem(item: T): boolean {
    return (
      this.removed.filter((v: T) => this.compareItems(item, v)).length !== 0
    );
  }

  private removeFromNew(item: T): void {
    this.new = this.new.filter((v) => !this.compareItems(v, item));
  }

  private removeFromCurrent(item: T): void {
    this.currentItems = this.currentItems.filter(
      (v) => !this.compareItems(item, v),
    );
  }

  private removeFromRemoved(item: T): void {
    this.removed = this.removed.filter((v) => !this.compareItems(item, v));
  }

  private wasAddedInitially(item: T): boolean {
    return (
      this.initial.filter((v: T) => this.compareItems(item, v)).length !== 0
    );
  }
}
