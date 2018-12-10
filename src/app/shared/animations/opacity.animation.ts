import { trigger, style, transition, animate } from '@angular/animations';

export const ANIMATION_OPACITY = trigger('opacity', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('300ms', style({ opacity: 1 }))
  ]),
  transition(':leave', [
    style({ opacity: 1 }),
    animate('300ms', style({ opacity: 0 }))
  ])
]);
