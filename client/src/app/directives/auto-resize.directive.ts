import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'textarea[appAutoResize]',
  standalone: true,
})
export class AutoResizeDirective {
  constructor(private element: ElementRef) {}

  @HostListener('input')
  onInput(): void {
    this.adjustHeight();
  }

  ngOnInit(): void {
    this.adjustHeight();
  }

  private adjustHeight(): void {
    const textarea = this.element.nativeElement;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }
}
