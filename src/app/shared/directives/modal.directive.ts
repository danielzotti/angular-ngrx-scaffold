import { Directive, ElementRef, Input, Renderer2, OnInit } from '@angular/core';

@Directive({ selector: '[dz-modal]' })
export class ModalDirective implements OnInit {
  @Input()
  onOverlayClickCallback: (event: Event) => void = null;

  @Input()
  hasCloseBtn: boolean;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    const element: HTMLElement = this.el.nativeElement;
    element.classList.add('dz-modal');

    // ---------create the close "button"---------
    const closeElement: HTMLElement = document.createElement('div');
    closeElement.classList.add('dz-close-modal');
    closeElement.innerHTML =
      '<button class="btn-icon-action"><i class="fa fa-times"></i></button>';
    closeElement.addEventListener('click', this.onOverlayClick.bind(this));
    // -------------------------------------------

    const content = element.children[0];
    if (content !== undefined) {
      content.className = 'dz-modal-content';
    }

    // -------------add close btn-------------
    if (this.hasCloseBtn) {
      if (content.children[0] !== undefined) {
        content.insertBefore(closeElement, content.children[0]);
      } else {
        element.appendChild(closeElement);
      }
    }
    // ----------------------------------------

    element.addEventListener('click', this.onOverlayClick.bind(this));
    content.addEventListener('click', this.onContentClick.bind(this));
  }

  public onOverlayClick = (event: Event) => {
    event.stopPropagation();
    event.stopImmediatePropagation();
    event.preventDefault();
    if (this.onOverlayClickCallback != null) {
      this.onOverlayClickCallback(event);
    }
  }

  public onContentClick = (event: Event) => {
    // per impedire la chiusura se clicco sul contenuto del modale
    event.stopPropagation();
    // event.preventDefault();
  }
}
