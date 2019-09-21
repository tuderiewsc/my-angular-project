import { animation, animate, style } from '@angular/animations';

export let fadeAnimation = animation([
  style({
    opacity: 0
  }),
  animate('1000ms 200ms ease-in-out', style({
    opacity: 1
  }))

]);

