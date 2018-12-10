import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { ErrorOccurred, ErrorActionTypes } from './error.actions';
import { mergeMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import { ErrorService } from 'src/app/modules/core/services/error.service';

@Injectable()
export class ErrorEffects {
  @Effect()
  errorOccured$ = this.actions$.pipe(
    ofType<ErrorOccurred>(ErrorActionTypes.Occured),
    mergeMap(action => {
      const { nextAction, errorData } = action.payload.error;
      // TODO: contare il numero di errori.
      // Se sono N (10?) chiamare la action "sendErrors" che
      // 1. invia al server la lista degli errori
      // 2. ripulisce la variabile "errors" nello stato
      this.errorService.toast(errorData);

      if (nextAction) {
        return of(nextAction);
      } else {
        return EMPTY;
      }
    })
  );
  constructor(private actions$: Actions, private errorService: ErrorService) {}
}
