import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[articlefav]',
})

export class FavoriteDirective {
  @HostBinding('class.is-favorite') isFavorite = true;
  @Input() set articlefav(value) {
    this.isFavorite = value;
  }
}


