import {
  Component,
  ViewChild,
  Renderer2,
  OnInit,
  OnDestroy,
  ElementRef,
  AfterViewInit
} from '@angular/core';

import { LoaderService } from './loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'dz-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('loader')
  loader: ElementRef;

  public isLoading: boolean;

  private subscription: Subscription;

  constructor(
    private loaderService: LoaderService,
    private renderer: Renderer2
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.subscription = this.loaderService.isLoading$.subscribe(
      (isLoading: boolean) => {
        this.isLoading = isLoading;
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
