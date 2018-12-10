import { createEntityAdapter } from '@ngrx/entity';
import { IEntityStoreEntity } from './entity.state';

export const adapter = createEntityAdapter<IEntityStoreEntity>();
