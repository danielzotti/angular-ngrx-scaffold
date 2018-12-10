import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../store/state';
import { IEntityCreate } from '../components/entity/create/entity-create.models';
import { IEntityEdit } from '../components/entity/edit/entity-edit.models';
import { IEntitySelectListItem } from '../components/entity/select-list/entity-select-list.models';
import { entityCreateModel, entityEditModel, entityList, entityIsFetching, entityById } from '../store/entity/entity.selectors';
import { EntityListLoad, EntityListLoadCancel, EntityCreate, EntityUpdate, EntityDelete, EntityUndelete, EntitySetCreateModel, EntityUnsetCreateModel, EntitySetEditModel, EntityUnsetEditModel, EntityLoad, EntityLoadCancel } from '../store/entity/entity.actions';

@Injectable()
export class EntityFacade {
  // Fetch
  isFetching$: Observable<boolean> = this.store.select(entityIsFetching);

  // Create
  createModel$: Observable<Partial<IEntityCreate>> = this.store.select(
    entityCreateModel
  );

  // Update
  editModel$: Observable<Partial<IEntityEdit>> = this.store.select(
    entityEditModel
  );

  // List
  list$: Observable<Array<IEntitySelectListItem>> = this.store.select(
    entityList
  );

  constructor(private store: Store<AppState>) {}

  // List
  loadAll() {
    this.store.dispatch(new EntityListLoad());
  }
  cancelLoadAll() {
    this.store.dispatch(new EntityListLoadCancel());
  }

  // Create
  create(entity: IEntityCreate) {
    this.store.dispatch(new EntityCreate(entity));
  }
  // Update
  update(entity: IEntityEdit) {
    this.store.dispatch(new EntityUpdate(entity));
  }
  // Delete
  delete(entity: IEntityEdit) {
    this.store.dispatch(new EntityDelete(entity));
  }
  // Undelete
  undelete(entity: IEntityEdit) {
    this.store.dispatch(new EntityUndelete(entity));
  }

  // Create Model
  setCreateModel(entity: IEntityCreate) {
    this.store.dispatch(new EntitySetCreateModel(entity));
  }
  unsetCreateModel() {
    this.store.dispatch(new EntityUnsetCreateModel());
  }
  // Edit Model
  setEditModel(entity: IEntityEdit) {
    this.store.dispatch(new EntitySetEditModel(entity));
  }
  unsetEditModel() {
    this.store.dispatch(new EntityUnsetEditModel());
  }

  // Get By Id
  loadById(entityId: number) {
    this.store.dispatch(new EntityLoad(entityId));
  }
  cancelLoadById() {
    this.store.dispatch(new EntityLoadCancel());
  }
  getById(entityId: number) {
    return this.store.select(entityById(entityId));
  }
}
