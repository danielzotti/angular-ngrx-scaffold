import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  AfterViewInit
} from '@angular/core';

import { Subscription } from 'rxjs';
import { InnerLoaderService } from './inner-loader.service';

@Component({
  selector: 'dz-inner-loader',
  templateUrl: './inner-loader.component.html',
  styleUrls: ['./inner-loader.component.scss']
})
export class InnerLoaderComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input()
  public isLoading = true;

  @Input()
  public template = 'base';

  private subscription: Subscription;

  constructor(private innerLoaderService: InnerLoaderService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.subscription = this.innerLoaderService.isLoading$.subscribe(
      (isLoading: boolean) => {
        this.isLoading = isLoading;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
