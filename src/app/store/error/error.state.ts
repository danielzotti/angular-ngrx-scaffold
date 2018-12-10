import { Action } from '@ngrx/store';

export interface IErrorState {
  errorData: any;
  fromAction: Action;
  nextAction: any;
  timestamp?: Date;
}
