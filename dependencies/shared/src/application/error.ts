/* eslint-disable max-classes-per-file */
// eslint-disable-next-line no-shadow
export enum AppErrorCode {
  SERVER_ERROR = 'app/server-error',
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export abstract class AppErrorBase<T = any> extends Error {
  constructor(readonly code: T, message?: string) {
    super(message);
  }
}

class ServerAppError extends AppErrorBase {
  constructor() {
    super(AppErrorCode.SERVER_ERROR, 'Unexpected server error');
  }
}

export abstract class AppError {
  static serverError(): ServerAppError {
    return new ServerAppError();
  }
}

/* eslint-enable max-classes-per-file */
