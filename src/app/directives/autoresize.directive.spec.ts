import { ElementRef } from '@angular/core';
import { AutoresizeDirective } from './autoresize.directive';

describe('AutoresizeDirective', () => {
  it('should create an instance', () => {
    const input = document.createElement('input');
    const directive = new AutoresizeDirective(new ElementRef(input));
    expect(directive).toBeTruthy();
  });
});
