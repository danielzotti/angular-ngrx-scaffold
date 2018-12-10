import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastContainer } from './component/toast-container.component';
import { ToastOptions } from './toast-options';
import { ToastService } from './toast.service';

@NgModule({
  imports: [CommonModule],
  declarations: [ToastContainer],
  exports: [ToastContainer],
  entryComponents: [ToastContainer]
})
export class ToastModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: ToastModule,
      providers: [ToastService, ToastOptions]
    };
  }
}
