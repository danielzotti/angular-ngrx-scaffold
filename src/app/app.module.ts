import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  StoreRouterConnectingModule,
  RouterStateSerializer
} from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';

import { environment } from '../environments/environment';
import { CoreModule } from './modules/core/core.module';

import { facades } from './facades';
import { services } from './services';

import { CustomSerializer } from './store/utils/router.utils';
import { reducers, metaReducers } from './store/reducers';
import { effects } from './store/effects';

import { NotFoundPage } from './pages/not-found/not-found.page';
import { HomePage } from './pages/home/home.page';
import { EntityListPage } from './pages/entity-list/entity-list.page';
import { EntityDetailPage } from './pages/entity-detail/entity-detail.page';
import { ModalDirective } from './shared/directives/modal.directive';
import { PageComponent } from './shared/components/page/page.component';
import { EntityEditComponent } from './components/entity/edit/entity-edit.component';
import { EntityCreateComponent } from './components/entity/create/entity-create.component';
import { EntitySelectListComponent } from './components/entity/select-list/entity-select-list.component';
import { OnlyNumber } from './shared/directives/only-number.directive';
import { EntityDetailComponent } from './components/entity/detail/entity-detail.component';
import { ModalComponent } from './shared/components/modal/modal.component';

@NgModule({
  imports: [
    // Angular
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    // STORE
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot(effects),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
    // APP
    CoreModule.forRoot()
  ],
  declarations: [
    // APP
    AppComponent,
    // PAGES
    HomePage,
    NotFoundPage,
    EntityListPage,
    EntityDetailPage,
    // COMPONENTS
    EntityEditComponent,
    EntityDetailComponent,
    EntityCreateComponent,
    EntitySelectListComponent,
    // shared
    PageComponent,
    ModalComponent,
    // DIRECTIVES
    // shared
    ModalDirective,
    OnlyNumber
  ],
  providers: [
    // FACADES
    facades,
    // SERVICES
    services,
    // SHARED
    { provide: RouterStateSerializer, useClass: CustomSerializer }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
