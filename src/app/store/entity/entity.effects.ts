import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';

import { map, catchError, switchMap, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { EntityService } from '../../services/entity.service';
import { ErrorOccurred } from '../error/error.actions';
import {
  EntityActionTypes,
  EntityCreate,
  EntityCreateSuccess,
  EntityCreateError,
  EntityLoad,
  EntityLoadCancel,
  EntityLoadSuccess,
  EntityLoadError,
  EntityUpdate,
  EntityUpdateSuccess,
  EntityUpdateError,
  EntityDelete,
  EntityDeleteSuccess,
  EntityDeleteError,
  EntityListLoadSuccess,
  EntityListLoadCancel,
  EntityListLoad,
  EntityListLoadError,
  EntityDeleteSuccessPermanent,
  EntityDeleteSuccessLogical,
  EntityUndeleteSuccess,
  EntityUndelete,
  EntityUndeleteError
} from './entity.actions';

import { TranslateService } from 'src/app/modules/core/modules/translate/translate.service';
import { ToastService } from 'src/app/modules/core/modules/toast/toast.service';

@Injectable()
export class EntityEffects {
  constructor(
    private actions$: Actions,
    private toastService: ToastService,
    private translateService: TranslateService,
    private entityService: EntityService
  ) {}

  // LOAD / LOAD CANCEL
  @Effect()
  entityLoadOrCancel$ = this.actions$.pipe(
    ofType<EntityLoad | EntityLoadCancel>(
      EntityActionTypes.Load,
      EntityActionTypes.LoadCancel
    ),
    switchMap(action => {
      return action.type === EntityActionTypes.LoadCancel
        ? of()
        : this.entityService.getById(action.payload.entityId).pipe(
            map(entity => new EntityLoadSuccess(entity)),
            catchError(err =>
              of(
                new ErrorOccurred({
                  fromAction: action,
                  errorData: err,
                  nextAction: new EntityLoadError()
                })
              )
            )
          );
    })
  );

  // CREATE
  @Effect()
  entityCreate$ = this.actions$.pipe(
    ofType<EntityCreate>(EntityActionTypes.Create),
    switchMap(action =>
      this.entityService.create(action.payload.entity).pipe(
        tap(entity =>
          this.toastService.success(
            `ID:${entity.id}`,
            this.translateService.translate(
              'Entità creata correttamente',
              'client_response.entity_created'
            )
          )
        ),
        map(entity => new EntityCreateSuccess(entity)),
        catchError(err =>
          of(
            new ErrorOccurred({
              fromAction: action,
              errorData: err,
              nextAction: new EntityCreateError(action.payload.entity)
            })
          )
        )
      )
    )
  );

  // UPDATE
  @Effect()
  entityUpdate$ = this.actions$.pipe(
    ofType<EntityUpdate>(EntityActionTypes.Update),
    switchMap(action => {
      return this.entityService.update(action.payload.entity).pipe(
        tap(entity =>
          this.toastService.success(
            `ID:${entity.id}`,
            this.translateService.translate(
              'Entità modificata correttamente',
              'client_response.entity_updated'
            )
          )
        ),
        map(entity => new EntityUpdateSuccess(entity)),
        catchError(err =>
          of(
            new ErrorOccurred({
              fromAction: action,
              errorData: err,
              nextAction: new EntityUpdateError(action.payload.entity)
            })
          )
        )
      );
    })
  );

  // DELETE
  @Effect()
  entityDelete$ = this.actions$.pipe(
    ofType<EntityDelete>(EntityActionTypes.Delete),
    switchMap(action =>
      this.entityService.delete(action.payload.entity.id).pipe(
        // map(entity => new EntityDeleteSuccess(entity)),
        map(entity => {
          if (!entity) {
            return new EntityDeleteSuccessPermanent(action.payload.entity);
          }
          return new EntityDeleteSuccessLogical(entity);
        }),
        catchError(err =>
          of(
            new ErrorOccurred({
              fromAction: action,
              errorData: err,
              nextAction: new EntityDeleteError(action.payload.entity)
            })
          )
        )
      )
    )
  );

  // UNDELETE
  @Effect()
  entityUndelete$ = this.actions$.pipe(
    ofType<EntityUndelete>(EntityActionTypes.Undelete),
    switchMap(action =>
      this.entityService.undelete(action.payload.entity.id).pipe(
        map(entity => {
          return new EntityUndeleteSuccess(entity);
        }),
        catchError(err =>
          of(
            new ErrorOccurred({
              fromAction: action,
              errorData: err,
              nextAction: new EntityUndeleteError()
            })
          )
        )
      )
    )
  );

  // LIST LOAD / LIST LOAD CANCEL
  @Effect()
  entityListLoadOrCancel$ = this.actions$.pipe(
    ofType<EntityListLoad | EntityListLoadCancel>(
      EntityActionTypes.ListLoad,
      EntityActionTypes.ListLoadCancel
    ),
    switchMap(action =>
      action.type === EntityActionTypes.ListLoadCancel
        ? of()
        : this.entityService.getSelectList().pipe(
            map(list => new EntityListLoadSuccess(list)),
            catchError(err =>
              of(
                new ErrorOccurred({
                  fromAction: action,
                  errorData: err,
                  nextAction: new EntityListLoadError()
                })
              )
            )
          )
    )
  );
}
