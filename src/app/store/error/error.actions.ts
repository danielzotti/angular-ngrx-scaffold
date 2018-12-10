import { Action } from '@ngrx/store';
import { IErrorState } from './error.state';

export enum ErrorActionTypes {
  Occured = '[Error] Error Occured'
}

export class ErrorOccurred implements Action {
  readonly type = ErrorActionTypes.Occured;
  payload: { error: IErrorState };
  constructor(public error: IErrorState) {
    this.payload = { error };
  }
}

export type ErrorActions = ErrorOccurred;
