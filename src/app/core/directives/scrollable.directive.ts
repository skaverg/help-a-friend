import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appScrollable]'
})
export class ScrollableDirective {
  @Output() triggerReached = new EventEmitter<boolean>();

  @HostListener('scroll', ['$event'])
  onScroll(evt: Event & { target: HTMLElement }) {
    if (
      evt.target.offsetHeight + evt.target.scrollTop + 80 >=
      evt.target.scrollHeight
    ) {
      this.triggerReached.emit(true);
    }
  }

}
