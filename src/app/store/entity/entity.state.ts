import { IEntityCreate } from 'src/app/components/entity/create/entity-create.models';
import { ICommonEntityState } from '../state';
import { IFormModel } from 'src/app/shared/models/form.models';
import { IEntityDb } from 'src/app/shared/models/db/entity.db.models';
import { IEntityEdit } from 'src/app/components/entity/edit/entity-edit.models';

export interface IEntityState
  extends ICommonEntityState<
    IEntityStoreEntity,
    IEntityCreate,
    IEntityEdit
  > {}

export type IEntityStoreEntity = IFormModel & IEntityDb;
