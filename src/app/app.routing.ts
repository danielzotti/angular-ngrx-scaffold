import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  otherRoutes,
  entitiesRoutes,
} from './routes.config';

const routes: Routes = [
  ...entitiesRoutes,
  ...otherRoutes
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes
      // { useHash: true }, //IE9
      // { enableTracing: true },
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
