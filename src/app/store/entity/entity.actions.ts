import { Action } from '@ngrx/store';
import { IEntityCreate } from 'src/app/components/entity/create/entity-create.models';
import { IEntityDb } from 'src/app/shared/models/db/entity.db.models';
import { IEntityEdit } from 'src/app/components/entity/edit/entity-edit.models';
import { IEntitySelectListItem } from 'src/app/components/entity/select-list/entity-select-list.models';
import { IEntityStoreEntity } from './entity.state';

export enum EntityActionTypes {
  Load = '[Entity] Load',
  LoadSuccess = '[Entity] Load Success',
  LoadError = '[Entity] Load Error',
  LoadCancel = '[Entity] Load Cancel',

  Create = '[Entity] Create',
  CreateSuccess = '[Entity] Create Success',
  CreateError = '[Entity] Create Error',

  Update = '[Entity] Update',
  UpdateSuccess = '[Entity] Update Success',
  UpdateError = '[Entity] Update Error',

  Delete = '[Entity] Delete',
  DeleteSuccess = '[Entity] Delete Success',
  DeleteSuccessLogical = '[Entity] Delete Success Logical',
  DeleteSuccessPermanent = '[Entity] Delete Success Permanent',
  DeleteError = '[Entity] Delete Error',

  Undelete = '[Entity] Undelete',
  UndeleteSuccess = '[Entity] Undelete Success',
  UndeleteError = '[Entity] Undelete Error',

  SetEditModel = '[Entity] Set Edit Model',
  UnsetEditModel = '[Entity] Unset Edit Model',

  SetCreateModel = '[Entity] Set Create Model',
  UnsetCreateModel = '[Entity] Unset Create Model',

  // List
  ListLoad = '[Entity List] Load',
  ListLoadSuccess = '[Entity List] Load Success',
  ListLoadError = '[Entity List] Load Error',
  ListLoadCancel = '[Entity List] Load Cancel',
}

//CREATE
export class EntityCreate implements Action {
  readonly type = EntityActionTypes.Create;
  payload: { entity: IEntityCreate };
  constructor(public entity: IEntityCreate) {
    this.payload = { entity };
  }
}
export class EntityCreateSuccess implements Action {
  readonly type = EntityActionTypes.CreateSuccess;
  payload: { entity: IEntityDb };
  constructor(public entity: IEntityDb) {
    this.payload = { entity };
  }
}
export class EntityCreateError implements Action {
  readonly type = EntityActionTypes.CreateError;
  payload: { entity: IEntityStoreEntity };
  constructor(public entity: IEntityStoreEntity) {
    this.payload = { entity };
  }
}

// UPDATE
export class EntityUpdate implements Action {
  readonly type = EntityActionTypes.Update;
  payload: { entity: IEntityEdit };
  constructor(public entity: IEntityEdit) {
    this.payload = { entity };
  }
}
export class EntityUpdateSuccess implements Action {
  readonly type = EntityActionTypes.UpdateSuccess;
  payload: { entity: IEntityDb };
  constructor(public entity: IEntityDb) {
    this.payload = { entity };
  }
}
export class EntityUpdateError implements Action {
  readonly type = EntityActionTypes.UpdateError;
  payload: { entity: IEntityStoreEntity };
  constructor(public entity: IEntityStoreEntity) {
    this.payload = { entity };
  }
}

// DELETE
export class EntityDelete implements Action {
  readonly type = EntityActionTypes.Delete;
  payload: { entity: IEntityStoreEntity };
  constructor(public entity: IEntityStoreEntity) {
    this.payload = { entity };
  }
}
export class EntityDeleteSuccess implements Action {
  readonly type = EntityActionTypes.DeleteSuccess;
  payload: { entity: IEntityStoreEntity };
  constructor(public entity: IEntityStoreEntity) {
    this.payload = { entity };
  }
}
export class EntityDeleteSuccessLogical implements Action {
  readonly type = EntityActionTypes.DeleteSuccessLogical;
  payload: { entity: IEntityStoreEntity };
  constructor(public entity: IEntityStoreEntity) {
    this.payload = { entity };
  }
}
export class EntityDeleteSuccessPermanent implements Action {
  readonly type = EntityActionTypes.DeleteSuccessPermanent;
  payload: { entity: IEntityStoreEntity };
  constructor(public entity: IEntityStoreEntity) {
    this.payload = { entity };
  }
}
export class EntityDeleteError implements Action {
  readonly type = EntityActionTypes.DeleteError;
  payload: { entity: IEntityStoreEntity };
  constructor(public entity: IEntityStoreEntity) {
    this.payload = { entity };
  }
}

// UNDELETE
export class EntityUndelete implements Action {
  readonly type = EntityActionTypes.Undelete;
  payload: { entity: IEntityEdit };
  constructor(public entity: IEntityEdit) {
    this.payload = { entity };
  }
}
export class EntityUndeleteSuccess implements Action {
  readonly type = EntityActionTypes.UndeleteSuccess;
  payload: { entity: IEntityStoreEntity };
  constructor(public entity: IEntityStoreEntity) {
    this.payload = { entity };
  }
}
export class EntityUndeleteError implements Action {
  readonly type = EntityActionTypes.UndeleteError;
  constructor() {}
}

// LOAD
export class EntityLoad implements Action {
  readonly type = EntityActionTypes.Load;
  payload: { entityId: number };
  constructor(public entityId: number) {
    this.payload = { entityId };
  }
}
export class EntityLoadSuccess implements Action {
  readonly type = EntityActionTypes.LoadSuccess;
  payload: { entity: IEntityDb };
  constructor(public entity: IEntityDb) {
    this.payload = { entity };
  }
}
export class EntityLoadError implements Action {
  readonly type = EntityActionTypes.LoadError;
  payload: { entity: IEntityDb };
  constructor() {
    this.payload = { entity: undefined };
  }
}
export class EntityLoadCancel implements Action {
  readonly type = EntityActionTypes.LoadCancel;
  payload: { entity: IEntityDb };
  constructor() {
    this.payload = { entity: undefined };
  }
}

// LIST LOAD
export class EntityListLoad implements Action {
  readonly type = EntityActionTypes.ListLoad;
  constructor() { }
}
export class EntityListLoadSuccess implements Action {
  readonly type = EntityActionTypes.ListLoadSuccess;
  payload: { list: Array<IEntitySelectListItem> };
  constructor(public list: Array<IEntitySelectListItem>) {
    this.payload = { list };
  }
}
export class EntityListLoadError implements Action {
  readonly type = EntityActionTypes.ListLoadError;
  payload: { list: Array<IEntitySelectListItem> };
  constructor() {
    this.payload = { list: [] };
  }
}
export class EntityListLoadCancel implements Action {
  readonly type = EntityActionTypes.ListLoadCancel;
  payload: { list: Array<IEntitySelectListItem> };
  constructor() {
    this.payload = { list: [] };
  }
}
// EDIT MODEL
export class EntitySetEditModel implements Action {
  readonly type = EntityActionTypes.SetEditModel;
  payload: { editModel: IEntityEdit };
  constructor(public editModel: IEntityEdit) {
    this.payload = { editModel };
  }
}
export class EntityUnsetEditModel implements Action {
  readonly type = EntityActionTypes.UnsetEditModel;
  payload: { editModel: IEntityEdit };
  constructor() {
    this.payload = { editModel: undefined };
  }
}

// CREATE MODEL
export class EntitySetCreateModel implements Action {
  readonly type = EntityActionTypes.SetCreateModel;
  payload: { createModel: IEntityCreate };
  constructor(public createModel: IEntityCreate) {
    this.payload = { createModel };
  }
}
export class EntityUnsetCreateModel implements Action {
  readonly type = EntityActionTypes.UnsetCreateModel;
  payload: { createModel: IEntityCreate };
  constructor() {
    this.payload = { createModel: undefined };
  }
}

export type EntityActions =
  | EntityCreate
  | EntityCreateSuccess
  | EntityCreateError
  | EntityUpdate
  | EntityUpdateSuccess
  | EntityUpdateError
  | EntityDelete
  | EntityDeleteSuccess
  | EntityDeleteSuccessLogical
  | EntityDeleteSuccessPermanent
  | EntityDeleteError
  | EntityUndelete
  | EntityUndeleteSuccess
  | EntityUndeleteError
  | EntityLoad
  | EntityLoadSuccess
  | EntityLoadError
  | EntityLoadCancel
  | EntityListLoad
  | EntityListLoadSuccess
  | EntityListLoadError
  | EntityListLoadCancel
  | EntitySetEditModel
  | EntityUnsetEditModel
  | EntitySetCreateModel
  | EntityUnsetCreateModel;
  
