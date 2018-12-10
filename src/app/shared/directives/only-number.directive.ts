import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[dzOnlyNumber]'
})
export class OnlyNumber {
  constructor(private el: ElementRef) {}

  @Input('dzOnlyNumber')
  value: string;

  @HostListener('keydown', ['$event'])
  onKeyDown(event) {
    const e = <KeyboardEvent>event;

    if (
      // delete, backspace, tab, esc, enter, decimal point //period (190), comma (188)
      [46, 8, 9, 27, 13, 110].indexOf(e.keyCode) !== -1 ||
      // Allow: Ctrl+A
      (e.keyCode === 65 && (e.ctrlKey || e.metaKey)) ||
      // Allow: Ctrl+C
      (e.keyCode === 67 && (e.ctrlKey || e.metaKey)) ||
      // Allow: Ctrl+V
      (e.keyCode === 86 && (e.ctrlKey || e.metaKey)) ||
      // Allow: Ctrl+X
      (e.keyCode === 88 && (e.ctrlKey || e.metaKey)) ||
      // Allow: home, end, left, right
      (e.keyCode >= 35 && e.keyCode <= 39)
    ) {
      // let it happen, don't do anything
      return;
    }
    // Ensure that it is a number or decimal separator (comma 188, period 190) and stop the keypress
    if (
      (e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) &&
      // Numbers
      (e.keyCode < 96 || e.keyCode > 105) &&
      // Only one dot
      (e.keyCode !== 190 ||
        (e.keyCode === 190 &&
          this.value &&
          this.value.toString().indexOf('.') !== -1))
      // Only one comma
      // (e.keyCode !== 188 ||
      //   (e.keyCode === 188 && this.value && this.value.toString().indexOf('.') !== -1))
    ) {
      e.preventDefault();
    }
  }
}
