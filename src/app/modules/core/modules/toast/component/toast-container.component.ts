import { Component, ChangeDetectorRef, NgZone, OnDestroy } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  AnimationEvent
} from '@angular/animations';
import { Toast } from '../toast';
import { ToastOptions } from '../toast-options';
import { DomSanitizer } from '@angular/platform-browser';
import { first } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'dz-toast-container',
  templateUrl: './toast-container.component.html',
  styleUrls: ['./toast-container.component.scss'],
  animations: [
    trigger('inOut', [
      state(
        'flyRight, flyLeft',
        style({ opacity: 1, transform: 'translateX(0)' })
      ),
      state('fade', style({ opacity: 1 })),
      state(
        'slideDown, slideUp',
        style({ opacity: 1, transform: 'translateY(0)' })
      ),
      transition('void => flyRight', [
        style({
          opacity: 0,
          transform: 'translateX(100%)'
        }),
        animate('0.2s ease-in')
      ]),
      transition('flyRight => void', [
        animate(
          '0.2s 10ms ease-out',
          style({
            opacity: 0,
            transform: 'translateX(100%)'
          })
        )
      ]),
      transition('void => flyLeft', [
        style({
          opacity: 0,
          transform: 'translateX(-100%)'
        }),
        animate('0.2s ease-in')
      ]),
      transition('flyLeft => void', [
        animate(
          '0.2s 10ms ease-out',
          style({
            opacity: 0,
            transform: 'translateX(-100%)'
          })
        )
      ]),
      transition('void => fade', [
        style({
          opacity: 0
        }),
        animate('0.3s ease-in')
      ]),
      transition('fade => void', [
        animate(
          '0.3s 10ms ease-out',
          style({
            opacity: 0
          })
        )
      ]),
      transition('void => slideDown', [
        style({
          opacity: 0,
          transform: 'translateY(-200%)'
        }),
        animate('0.3s ease-in')
      ]),
      transition('slideDown => void', [
        animate(
          '0.3s 10ms ease-out',
          style({
            opacity: 0,
            transform: 'translateY(-200%)'
          })
        )
      ]),
      transition('void => slideUp', [
        style({
          opacity: 0,
          transform: 'translateY(200%)'
        }),
        animate('0.3s ease-in')
      ]),
      transition('slideUp => void', [
        animate(
          '0.3s 10ms ease-out',
          style({
            opacity: 0,
            transform: 'translateY(200%)'
          })
        )
      ])
    ])
  ]
})
export class ToastContainer implements OnDestroy {
  position = 'fixed';
  messageClass: string;
  titleClass: string;
  positionClass: string;
  maxShown: number;
  newestOnTop: boolean;
  animate: string;
  toasts: Toast[] = [];

  private _fresh: boolean = true;
  private onToastClicked: (toast: Toast) => void;

  private _onEnter: Subject<any> = new Subject();
  private _onExit: Subject<any> = new Subject();

  constructor(
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef,
    private _zone: NgZone,
    options: ToastOptions
  ) {
    Object.assign(this, options);
  }

  onEnter(): Observable<void> {
    return this._onEnter.asObservable();
  }

  onExit(): Observable<void> {
    return this._onExit.asObservable();
  }

  addToast(toast: Toast) {
    if (this.positionClass.indexOf('top') > 0) {
      if (this.newestOnTop) {
        this.toasts.unshift(toast);
      } else {
        this.toasts.push(toast);
      }

      if (this.toasts.length > this.maxShown) {
        const diff = this.toasts.length - this.maxShown;

        if (this.newestOnTop) {
          this.toasts.splice(this.maxShown);
        } else {
          this.toasts.splice(0, diff);
        }
      }
    } else {
      this.toasts.unshift(toast);
      if (this.toasts.length > this.maxShown) {
        this.toasts.splice(this.maxShown);
      }
    }

    if (this.animate === null && this._fresh) {
      this._fresh = false;
      this._onEnter.next();
      this._onEnter.complete();
    }

    this.cdr.detectChanges();
  }

  removeToast(toast: Toast) {
    if (toast.timeoutId) {
      clearTimeout(toast.timeoutId);
      toast.timeoutId = null;
    }

    this.toasts = this.toasts.filter(t => {
      return t.id !== toast.id;
    });
  }

  removeAllToasts() {
    this.toasts = [];
  }

  clicked(toast: Toast) {
    if (this.onToastClicked) {
      this.onToastClicked(toast);
    }
  }

  anyToast(): boolean {
    return this.toasts.length > 0;
  }

  findToast(toastId: number): Toast | void {
    for (let toast of this.toasts) {
      if (toast.id === toastId) {
        return toast;
      }
    }
    return null;
  }

  onAnimationEnd(event: AnimationEvent) {
    if (event.toState === 'void' && !this.anyToast()) {
      this._ngExit();
    } else if (this._fresh && event.fromState === 'void') {
      // notify when first animation is done
      this._fresh = false;
      this._zone.run(() => {
        this._onEnter.next();
        this._onEnter.complete();
      });
    }
  }

  private _ngExit() {
    this._zone.onMicrotaskEmpty.pipe(first()).subscribe(() => {
      this._onExit.next();
      this._onExit.complete();
    });
  }

  ngOnDestroy() {
    this._ngExit();
  }
}
