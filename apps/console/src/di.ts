/* eslint-disable max-classes-per-file */
import DIContainer, {
  factory, func, object, use, value,
} from 'rsdi';
import type {
  DependencyResolver,
  ResolvedType,
  ResolverName,
} from 'rsdi/types';

interface INamedResolvers {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [k: string]: DependencyResolver | any;
}

class Container {
  private static instance = new DIContainer();

  static init() {
    this.instance = new DIContainer();
  }

  static get<Custom = void, Name extends ResolverName = string>(
    dependencyName: Name,
    parentDeps?: string[],
  ): ResolvedType<Custom, Name> {
    return this.instance.get(dependencyName, parentDeps);
  }

  static add(resolvers: INamedResolvers): void {
    return this.instance.add(resolvers);
  }
}

export class container {
  static get<Custom = void, Name extends ResolverName = string>(
    dependencyName: Name,
    parentDeps?: string[],
  ): ResolvedType<Custom, Name> {
    return Container.get(dependencyName, parentDeps);
  }
}

export default function initDependencyInjection(
  callback?: (helpers: {
    factory: typeof factory;
    func: typeof func;
    object: typeof object;
    use: typeof use;
    value: typeof value;
  }) => INamedResolvers,
) {
  Container.init();
  if (callback) {
    Container.add(
      callback({
        object,
        func,
        use,
        factory,
        value,
      }),
    );
  }
}
/* eslint-enable max-classes-per-file */
