import { RouterReducerState } from '@ngrx/router-store';
import { EntityState, Dictionary } from '@ngrx/entity';
import { RouterStateUrl } from './utils/router.utils';
import { IErrorState } from './error/error.state';
import { IEntityState } from './entity/entity.state';

export interface AppState {
  router: RouterReducerState<RouterStateUrl>;
  errors: Array<IErrorState>;
  entities: IEntityState;
}

export interface ICommonEntityState<EntityStore, EntityCreate, EntityEdit>
  extends EntityState<EntityStore> {
  isFetching: boolean;
  editModel: Partial<EntityEdit>;
  createModel: Partial<EntityCreate>;
}

export interface ICommonEntityStateAny {
  ids: string[] | number[];
  entities: Dictionary<any>;
  isFetching: Boolean;
  editModel: any;
  createModel: any;
}
