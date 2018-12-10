import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ConfigService } from './modules/core/config/config.service';
import { ToastService } from './modules/core/modules/toast/toast.service';

@Component({
  selector: 'dz-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-ngrx-scaffold';

  constructor(
    private titleService: Title,
    public toast: ToastService,
    vcr: ViewContainerRef
  ) {
    this.toast.setRootViewContainerRef(vcr);
  }

  ngOnInit(): void {
    this.titleService.setTitle(ConfigService.APP_NAME);
    // this.toast.success('Questo è un test per il toast', 'Benvenuto');
  }

  showSuccess() {}
}
