import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ANIMATION_SLIDE_TOP } from '../../animations/slide-in.animation';
import { ANIMATION_OPACITY } from '../../animations/opacity.animation';

@Component({
  selector: 'dz-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [ANIMATION_SLIDE_TOP, ANIMATION_OPACITY]
})
export class ModalComponent {
  @Input()
  hasCloseButton = true;

  @Output()
  closed: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {}

  onOverlay(e: Event) {
    if (e.currentTarget === e.target) {
      this.close(e);
    }
  }
  close(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    this.closed.emit(true);
  }
}
