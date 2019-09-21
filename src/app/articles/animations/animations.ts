import { animation, animate, style } from '@angular/animations';

export let fadeAnimation = animation([
  style({
    opacity: '{{ from }}'
  }),
  animate('{{ time }} {{ delay }} ease-in-out', style({
    opacity: '{{ to }}'
  }))

]);

export let slideAnimation = animation([
  style({ opacity: 0, position: 'absolute', left: 0, right: 0, transform: 'translate3d(100%,0,0)' }),
  animate('400ms ease-in-out', style({ opacity: 1, transform: 'translate3d(0%,0,0)' })),
]);

