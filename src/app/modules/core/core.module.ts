import { NgModule, forwardRef, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// MODULES
import { TranslateModule } from './modules/translate/translate.module';
import { ToastModule } from './modules/toast/toast.module';

// CONFIG
import { ConfigService } from './config/config.service';

// COMPONENTS
import { InnerLoaderComponent } from './components/inner-loader/inner-loader.component';
import { InnerLoaderService } from './components/inner-loader/inner-loader.service';
import { LoaderComponent } from './components/loader/loader.component';
import { LoaderService } from './components/loader/loader.service';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { ProgressBarService } from './components/progress-bar/progress-bar.service';

// SERVICES
import { ErrorService } from './services/error.service';
import { LoggerService } from './services/logger.service';
import { RouteService } from './services/route.service';
import { ToastService } from './modules/toast/toast.service';
import { TranslateService } from './modules/translate/translate.service';
import { ProgressBarInterceptor } from './components/progress-bar/progress-bar.interceptor';

// DIRECTIVES
import { TranslateDirective } from './modules/translate/translate.directive';

// PIPES
import { TranslatePipe } from './modules/translate/translate.pipe';
import { CustomDatePipe } from './pipes/custom-date.pipe';
import { SearchFieldPipe } from './pipes/search-field.pipe';
import { DatePatternValidatorDirective } from './validators/date-pattern.directive';
import { FormService } from './services/form.service';

export function errorServiceFactory(
  toastService: ToastService,
  translateService: TranslateService
) {
  return new ErrorService(toastService, translateService);
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule.forRoot(),
    TranslateModule.forRoot()
  ],
  declarations: [
    // Components
    ProgressBarComponent,
    LoaderComponent,
    InnerLoaderComponent,
    // Pipes
    CustomDatePipe,
    SearchFieldPipe,
    // Directives
    DatePatternValidatorDirective
  ],
  providers: [],
  exports: [
    // Components
    ProgressBarComponent,
    LoaderComponent,
    InnerLoaderComponent,
    // Directives
    TranslateDirective,
    DatePatternValidatorDirective,
    // Pipes
    TranslatePipe,
    CustomDatePipe,
    SearchFieldPipe
  ]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        ConfigService,
        {
          provide: ErrorService,
          useFactory: errorServiceFactory,
          deps: [ToastService, TranslateService]
        },
        TranslateService,
        ToastService,
        FormService,
        InnerLoaderService,
        LoaderService,
        LoggerService,
        ProgressBarService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ProgressBarInterceptor,
          multi: true
        },
        ProgressBarInterceptor,
        RouteService
      ]
    };
  }
}
