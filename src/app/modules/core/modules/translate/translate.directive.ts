import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { TranslateService } from './translate.service';
import { environment } from 'src/environments/environment';

@Directive({ selector: '[dz-translate]' })
export class TranslateDirective implements OnInit, OnChanges {
  @Input('dz-translate')
  key: string;

  @Input('dz-translate-target')
  target: string;

  value: string;

  constructor(
    private el: ElementRef,
    private translateService: TranslateService
  ) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.activate();
  }

  public activate() {
    const element: HTMLElement = this.el.nativeElement;

    const translation = this.translateService.translate(this.value, this.key);

    if (translation != null) {
      if (!environment.production) {
        element.classList.add('dz-translate');
      }

      if (typeof this.target !== 'undefined' && this.target != null) {
        element[this.target] = translation;
      } else {
        element.innerHTML = translation;
      }
    }
  }
}
