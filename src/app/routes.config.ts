import { Routes } from '@angular/router';
import { NotFoundPage } from './pages/not-found/not-found.page';
import { EntityListPage } from './pages/entity-list/entity-list.page';
import { EntityDetailPage } from './pages/entity-detail/entity-detail.page';


export const entitiesRoutes: Routes = [
  {
    path: 'entities',
    component: EntityListPage
  },
  {
    path: 'entities/:entityId',
    component: EntityDetailPage
  }
];

export const otherRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'entities' },
  {
    path: '**',
    component: NotFoundPage
  }
];
