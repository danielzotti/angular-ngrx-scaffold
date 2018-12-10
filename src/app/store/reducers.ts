import { ActionReducerMap, MetaReducer, createSelector } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';

import { environment } from '../../environments/environment';

import { AppState } from './state';

import { handleUndo } from './utils/metareducers/undo.utils';
import { logger } from './utils/metareducers/logger.utils';

import { errorReducer } from './error/error.reducers';
import { entityReducer } from './entity/entity.reducer';

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer,
  errors: errorReducer,
  entities: entityReducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? [
      // handleUndo,
      // logger
    ]
  : [];
