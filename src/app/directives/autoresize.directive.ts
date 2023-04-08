import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  AfterViewInit,
} from '@angular/core';
import { NgModel } from '@angular/forms';

@Directive({
  selector: '[autoResize]',
})
export class AutoresizeDirective implements AfterViewInit {
  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.adjustFontSize(this.el.nativeElement);
    }, 0);
  }

  @Input('fixedvalue')
  set fixedvalue(value: string | number) {
    this.el.nativeElement.value = value;
    this.adjustFontSize(this.el.nativeElement);
  }

  @Input() maxInputFont: number = 25;
  @Input() hasArrow: boolean;

  @HostListener('input', ['$event.target'])
  onInput(textArea: HTMLTextAreaElement | HTMLInputElement): void {
    this.adjustFontSize(textArea);
  }

  private adjustFontSize(
    element: HTMLTextAreaElement | HTMLInputElement
  ): void {
    const style = window.getComputedStyle(element);

    const { value } = element;
    const maxHeight = parseInt(style.getPropertyValue('height'), 10);

    if (element.tagName.toLowerCase() === 'textarea') {
      this.adjustTextArea(element, style, value, maxHeight);
    } else if (element.tagName.toLowerCase() === 'input') {
      this.adjustInput(element, style, maxHeight);
    } else if (element.tagName.toLowerCase() === 'select') {
      this.adjustSelect(element, style, value, maxHeight);
    }
  }

  adjustTextArea(element: any, style: any, value: any, maxHeight: any) {
    const fontSize = parseInt(style.getPropertyValue('font-size'), 10);
    let newSize = Math.min(this.maxInputFont, maxHeight);
    element.style.fontSize = `${newSize}px`;
    while (newSize > 0 && hasOverflowHeight(element)) {
      newSize -= 1;
      element.style.fontSize = `${newSize}px`;
    }
  }

  adjustInput(element: any, style: any, maxHeight: any) {
    // resize input by width
    const fontSize = parseInt(style.getPropertyValue('font-size'), 10);
    let newSize = Math.min(this.maxInputFont,maxHeight - 1);
    if (fontSize != newSize)
      element.style.fontSize = `${newSize}px`;
    while (newSize > 0 && hasOverflow(element)) {
      newSize -= 1;
      element.style.fontSize = `${newSize}px`;
    }
  }

  adjustSelect(select: any, style: any, value : any, maxHeight: any) {
    const maxWidth = select.offsetWidth;

    // Create a dummy span to measure the text width
    const dummy = document.createElement('span');
    dummy.style.visibility = 'hidden';
    dummy.style.whiteSpace = 'pre';
    dummy.style.font = style.font;
    dummy.style.width = maxWidth;
    dummy.style.height = maxHeight;
    dummy.textContent= value
    document.body.appendChild(dummy);

    // Set the font size to 100px to start
    let fontSize = maxHeight-1;
    dummy.style.fontSize = fontSize + 'px';

    // Reduce the font size until the text fits inside the select
    while (dummy.offsetWidth >= maxWidth-(this.hasArrow ? 15 : 0) && fontSize > 5) {
      fontSize--;
      dummy.style.fontSize = fontSize + 'px';
    }

    // Set the font size of the select's options
    select.style.fontSize =  (fontSize) + 'px';

    // Clean up
    document.body.removeChild(dummy);
  }
}

function hasOverflow(input: HTMLTextAreaElement | HTMLInputElement): boolean {
  return input.scrollWidth > input.clientWidth + 1;
}

function hasOverflowHeight(textarea: HTMLTextAreaElement | HTMLInputElement): boolean {
  return textarea.scrollHeight > textarea.clientHeight + 1;
}
