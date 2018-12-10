import { trigger, style, transition, animate } from '@angular/animations';

export const ANIMATION_SLIDE_TOP = trigger('slideTop', [
  transition(':enter', [
    style({ transform: 'translateY(-100%)' }),
    animate('200ms', style({ transform: 'translateY(0)' }))
  ]),
  transition(':leave', [
    style({ transform: 'translateY(0)' }),
    animate('200ms', style({ transform: 'translateY(-100%)' }))
  ])
]);
