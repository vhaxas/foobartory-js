/* eslint-disable max-classes-per-file */
import { AppError, AppErrorBase } from '^shared/application/error';

// eslint-disable-next-line no-shadow
export enum FactoryAppErrorCode {}

export class FactoryAppErrorBase extends AppErrorBase<FactoryAppErrorCode> {}

export class FactoryAppError extends AppError {}

/* eslint-enable max-classes-per-file */
