import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appWhiteFlagFallback]',
  standalone: true,
})
export class WhiteFlagFallbackDirective {
  appImgFallback = '/assets/white-flag.png';

  constructor(private elementRef: ElementRef) {}

  @HostListener('error')
  loadFallbackOnError() {
    const element: HTMLImageElement = <HTMLImageElement>(
      this.elementRef.nativeElement
    );
    element.src = this.appImgFallback;
  }
}
