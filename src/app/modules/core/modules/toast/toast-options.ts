import { Injectable } from '@angular/core';

export interface IToastOptions {
  dismiss: string; // 'auto' | 'click' | 'controlled';
  enableHTML: boolean;
  titleClass: string;
  messageClass: string;
  toastLife: number;
  showCloseButton: boolean;
}

@Injectable()
export class ToastOptions implements IToastOptions {
  positionClass = 'toast-top-right';
  maxShown = 5;
  newestOnTop = false;
  animate = 'fade';

  // override-able properties
  toastLife = 5000;
  enableHTML = false;
  dismiss = 'auto';
  messageClass = 'toast-message';
  titleClass = 'toast-title';
  showCloseButton = false;

  constructor() {}
}
