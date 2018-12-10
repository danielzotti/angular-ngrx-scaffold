import { IErrorState } from './error.state';
import { ErrorActions, ErrorActionTypes } from './error.actions';

const initialErrorState: Array<IErrorState> = [];

export function errorReducer(
  state: Array<IErrorState> = initialErrorState,
  action: ErrorActions
): Array<IErrorState> {
  switch (action.type) {
    case ErrorActionTypes.Occured:
      return [...state, { ...action.payload.error, timestamp: new Date() }];

    default:
      return state;
  }
}
