import {
  NgModule,
  ModuleWithProviders,
  forwardRef,
  APP_INITIALIZER
} from '@angular/core';

import { TranslateService } from './translate.service';
import { TranslatePipe } from './translate.pipe';
import { TranslateDirective } from './translate.directive';

export function getTranslateServiceAndLoad(translateService: TranslateService) {
  return () => translateService.load();
}

@NgModule({
  imports: [],
  declarations: [TranslateDirective, TranslatePipe],
  exports: [TranslateDirective, TranslatePipe]
})
export class TranslateModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: TranslateModule,
      providers: [
        // TranslateService,
        forwardRef(() => TranslateService),
        {
          provide: APP_INITIALIZER,
          useFactory: getTranslateServiceAndLoad,
          deps: [TranslateService],
          multi: true
        }
      ]
    };
  }
}
