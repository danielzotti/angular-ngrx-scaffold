import {
  Component,
  ViewChild,
  Renderer2,
  OnInit,
  OnDestroy,
  ElementRef,
  AfterViewInit
} from '@angular/core';

import { ProgressBarService } from './progress-bar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'dz-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('bar')
  bar: ElementRef;

  private subscription: Subscription;

  constructor(
    private progressBarService: ProgressBarService,
    private renderer: Renderer2
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    // this.renderer.setStyle(
    //     this.bar.nativeElement,
    //     'width', '90%'
    // )
    this.subscription = this.progressBarService.percentage$.subscribe(
      (p: number) => {
        if (p === 0) {
          this.resetPercentage();
        } else {
          this.updatePercentage(p);
        }
      }
    );
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

  private updatePercentage(p) {
    this.renderer.setStyle(this.bar.nativeElement, 'opacity', '1');
    this.renderer.setStyle(this.bar.nativeElement, 'width', p + '%');
  }

  private resetPercentage() {
    this.renderer.setStyle(this.bar.nativeElement, 'opacity', '0');
    this.renderer.setStyle(this.bar.nativeElement, 'width', '0');
  }
}
