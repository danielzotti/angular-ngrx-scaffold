import { Action, ActionReducer } from '@ngrx/store';
import { AppState } from '../../state';

export function handleUndo(
  rootReducer: ActionReducer<AppState>
): ActionReducer<AppState> {
  // keep the executedActions
  let executedActions: Array<Action> = [];
  return (state: AppState, action: Action) => {
    if (action.type === 'UNDO') {
      // if the action is UNDO_ACTION,
      // then call all the actions again on the rootReducer,
      // except the one we want to rollback
      let newState: any = {};
      executedActions = executedActions.filter(
        eAct => eAct !== (<{ type: string; payload: any }>action).payload
      );
      // update the state for every action untill we get the
      // exact same state as before, but without the action we want to rollback
      executedActions.forEach(
        executedAction => (newState = rootReducer(newState, executedAction))
      );
      return newState;
    }
    // push every action that isn't an UNDO_ACTION to the executedActions property
    executedActions.push(action);
    console.log(executedActions);
    // just delegate
    return rootReducer(state, action);
  };
}
