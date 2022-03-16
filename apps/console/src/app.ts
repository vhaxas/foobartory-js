// eslint-disable-next-line @typescript-eslint/no-empty-function
function noOp() {}

export class App {
  private init: () => void = noOp;

  private cleanup: () => void = noOp;

  private exit: () => void = noOp;

  on(event: 'init' | 'clean' | 'exit', callback: () => void) {
    switch (event) {
      case 'init':
        this.init = callback;
        break;
      case 'clean':
        this.cleanup = callback;
        break;
      case 'exit':
        this.exit = callback;
        break;
      default:
        break;
    }
  }

  run(fn: () => void) {
    App.main(async () => {
      const tick = () => {
        setTimeout(() => {
          tick();
        });
      };
      this.init();
      fn();
      tick();
    });

    process.stdin.resume(); // so the program will not close instantly

    // do something when app is closing
    process.on('exit', this.exitHandler.bind(this, { cleanup: true }));

    // catches ctrl+c event
    process.on('SIGINT', this.exitHandler.bind(this, { exit: true }));

    // catches "kill pid" (for example: nodemon restart)
    process.on('SIGUSR1', this.exitHandler.bind(this, { exit: true }));
    process.on('SIGUSR2', this.exitHandler.bind(this, { exit: true }));

    // catches uncaught exceptions
    process.on(
      'uncaughtException',
      this.exitHandler.bind(this, { exit: true }),
    );
  }

  private exitHandler(
    options: { cleanup?: boolean; exit?: boolean },
    // exitCode: number,
  ) {
    if (options.cleanup) {
      this.cleanup();
    }
    // if (exitCode || exitCode === 0) console.log(exitCode);
    if (options.exit) {
      this.exit();
      process.exit();
    }
  }

  private static async main(fn: () => Promise<void>) {
    try {
      await fn();
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
