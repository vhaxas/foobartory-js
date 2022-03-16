# FOOBARTORY

## Statement
The goal is to code an automatic production line of `foobar`.

At the beginning, we have 2 robots, each of which is able to perform several actions:

Moving to change activity: occupy the robot for 5 seconds.
Mining `foo`: occupies the robot for 1 second.
Mining `bar`: keeps the robot busy for a random time between 0.5 and 2 seconds.
Assembling a `foobar` from a `foo` and a `bar`: keeps the robot busy for 2 seconds. The operation has a 60% chance of success; in case of failure the `bar` can be reused, the `foo` is lost.
You have large warehouses, stock management is not a problem. On the other hand, the legislation imposes the traceability of the parts used to manufacture the `foobars`: each `foo` and each `bar` must have a unique serial number that must be found on the `foobar` when it leaves the factory.

We then want to speed up production to quickly take control of the `foobar` market. The robots can perform new actions:

Sell `foobar`: 10s to sell from 1 to 5 `foobar`, we earn €1 per `foobar` sold
Buy a new robot for €3 and 6 `foo`, 0s
The factory stops when you reach 30 robots.

## What's inside?

This turborepo uses [Yarn](https://classic.yarnpkg.com/lang/en/) as a package manager. It includes the following packages/apps:

### Apps

- `console`: a NodeJS app, used as entrypoint

### Dependency packages

- `module-factory`: a Typescript library used by `console` app, which contains the core of the application
- `shared`: a Typescript library shared by both `console` app and `module-factory` package

### Development dependency packages

- `ava`: Configuration for the [AVA](https://github.com/avajs/ava) testing framework, used for TDD
- `cucumber`: Configuration for the [Cucumber](https://cucumber.io/) testing framework, used for BDD
- `devtools`: Utilities used throughout the monorepo, like [npm-run-all](https://github.com/mysticatea/npm-run-all) or [rimraf](https://github.com/isaacs/rimraf)
- `eslint`: [ESLint](https://eslint.org/)-base package used throughout the monorepo, for code linting
- `eslint-config`: `eslint.config.js`s used throughout the monorepo
- `prettier`: [Prettier](https://prettier.io)-base package used throughout the monorepo, for code formatting
- `prettier-config`: `prettier.config.js`s used throughout the monorepo
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

## Setup

Before any of the next commands, please run the following command to bootstrap the environment:

```
$ yarn
```

### Build

To build all apps and packages, run the following command:

```
$ yarn build
```

### Start

To start all apps, run the following command:

```
$ yarn start
```

### Docker

To build all apps' docker's images, run the following command:

```
$ yarn build:docker
```

#### Running the container

```
$ docker run --rm -it foobartory-console:latest
```

### Test

To run all the tests suites, run the following command:

```
$ yarn test
```

#### Acceptance

To run the acceptance tests, run the following command:

```
$ yarn test:acceptance
```

#### Unit

To run the acceptance tests, run the following command:

```
$ yarn test:unit
```

#### Coverage

To run the coverage, run the following command:

```
$ yarn coverage
```

### Cleanup

To cleanup and reset repository state before bootstrap, run the following command:

```
$ yarn clean
```