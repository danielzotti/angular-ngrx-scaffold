import { adapter } from './entity.adapter';
import { IEntityState } from './entity.state';
import { EntityActions, EntityActionTypes } from './entity.actions';
import * as fromObjectUtils from '../utils/object.utils';

const initialEntityState: IEntityState = {
  entities: {},
  ids: [],
  isFetching: false,
  createModel: undefined,
  editModel: undefined
};

export function entityReducer(
  state: IEntityState = initialEntityState,
  action: EntityActions
): IEntityState {
  switch (action.type) {
    // CREATE
    case EntityActionTypes.Create:
      const createModel = { ...action.payload.entity };
      return {
        ...state,
        createModel: { ...createModel, isLoading: true }
      };
    // CREATE SUCCESS
    case EntityActionTypes.CreateSuccess:
      const createdModel = { ...action.payload.entity };
      return adapter.addOne(createdModel, {
        ...state,
        createModel: { isLoading: false, isDone: true }
      });
    // CREATE ERROR
    case EntityActionTypes.CreateError:
      return {
        ...state,
        createModel: { ...state.createModel, isLoading: false, hasError: true }
      };
    // UPDATE
    case EntityActionTypes.Update:
    case EntityActionTypes.Undelete:
      const editModel = { ...action.payload.entity };
      return {
        ...state,
        editModel: { ...editModel, isLoading: true }
      };

    // UPDATE SUCCESS
    case EntityActionTypes.UpdateSuccess:
    case EntityActionTypes.DeleteSuccessLogical:
    case EntityActionTypes.UndeleteSuccess:
      const editedModel = { ...action.payload.entity };
      return adapter.upsertOne(editedModel, {
        ...state,
        editModel: { ...editedModel, isLoading: false, isDone: true }
      });
    // UPDATE ERROR
    case EntityActionTypes.UpdateError:
    case EntityActionTypes.DeleteError:
    case EntityActionTypes.UndeleteError:
      return {
        ...state,
        editModel: { ...state.editModel, isLoading: false, hasError: true }
      };
    // DELETE
    case EntityActionTypes.Delete:
      const deleteModel = { ...action.payload.entity };
      return {
        ...state,
        editModel: { ...deleteModel, isLoading: true }
      };
    // DELETE SUCCESS
    case EntityActionTypes.DeleteSuccess:
    case EntityActionTypes.DeleteSuccessPermanent:
      const deletedModel = { ...action.payload.entity };
      return adapter.removeOne(deletedModel.id, {
        ...state,
        editModel: { ...deletedModel, isLoading: false, isDone: true }
      });
    // DELETE ERROR
    case EntityActionTypes.DeleteError:
      return {
        ...state,
        editModel: { ...state.editModel, isLoading: false, hasError: true }
      };
    // LOAD
    case EntityActionTypes.Load:
      return {
        ...state,
        isFetching: true,
        createModel: undefined,
        editModel: { isLoading: true }
      };
    // LOAD SUCCESS
    case EntityActionTypes.LoadSuccess:
      const loadedModel = { ...action.payload.entity };
      return adapter.upsertOne(loadedModel, {
        ...state,
        isFetching: false,
        editModel: undefined,
        createModel: undefined
      });
    // LOAD CANCEL
    case EntityActionTypes.LoadCancel:
      return {
        ...state,
        isFetching: false,
        editModel: undefined,
        createModel: undefined
      };
    // LOAD ERROR
    case EntityActionTypes.LoadError:
      return {
        ...state,
        isFetching: false,
        editModel: undefined,
        createModel: undefined
      };

    // LIST LOAD
    case EntityActionTypes.ListLoad:
      return {
        ...state,
        isFetching: true
      };
    // LIST LOAD SUCCESS / ERROR
    case EntityActionTypes.ListLoadSuccess:
    case EntityActionTypes.ListLoadError:
      const { list } = action.payload;
      return adapter.upsertMany(list, {
        ...state,
        isFetching: false,
        createModel: undefined,
        editModel: undefined
      });
    // LIST LOAD CANCEL
    case EntityActionTypes.ListLoadCancel:
      return {
        ...state,
        isFetching: false
      };
    // EDIT MODEL
    case EntityActionTypes.SetEditModel:
      const editingModel = action.payload.editModel;
      return {
        ...state,
        editModel: { ...editingModel }
      };
    case EntityActionTypes.UnsetEditModel:
      return { ...state, editModel: undefined };
    // CREATE MODEL
    case EntityActionTypes.SetCreateModel:
      const creatingModel = action.payload.createModel;
      return {
        ...state,
        createModel: { ...creatingModel }
      };
    case EntityActionTypes.UnsetCreateModel:
      return { ...state, createModel: undefined };

    default:
      return state;
  }
}
