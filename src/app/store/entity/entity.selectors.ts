import { createSelector } from '@ngrx/store';
import { AppState } from '../state';
import * as fromObjectUtils from '../utils/object.utils';
import { IEntityState } from './entity.state';

export const selectEntityState = (state: AppState): IEntityState =>
  state.entities;

// Entities
export const entityEntities = createSelector(
  selectEntityState,
  state => state.entities
);

// List in array
export const entityList = createSelector(
  entityEntities,
  entities => fromObjectUtils.toArray(entities)
);

// Fetch
export const entityIsFetching = createSelector(
  selectEntityState,
  state => state.isFetching
);

// Create
export const entityCreateModel = createSelector(
  selectEntityState,
  state => state.createModel
);

// Edit
export const entityEditModel = createSelector(
  selectEntityState,
  state => state.editModel
);

// GetById
export const entityById = (entityId: number) =>
  createSelector(
    entityEntities,
    entities => entities[entityId]
);

