import { AfterViewInit, Directive, DoCheck, ElementRef, HostListener, Input, OnDestroy } from '@angular/core';

// Batch all sheet fields in one frame instead of scheduling a timer per field.
const pending = new Set<AutoresizeDirective>();
let frame = 0;
function schedule(directive: AutoresizeDirective): void {
  pending.add(directive);
  if (!frame) frame = requestAnimationFrame(() => {
    frame = 0;
    const fields = [...pending]; pending.clear(); fields.forEach(field => field.fit());
  });
}

@Directive({ selector: '[autoResize]' })
export class AutoresizeDirective implements AfterViewInit, DoCheck, OnDestroy {
  @Input() maxInputFont = 18;
  @Input() hasArrow = false;
  private observer?: ResizeObserver;
  private previousValue = '';
  private originalTitle = '';
  private ready = false;
  constructor(private el: ElementRef<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {}
  @Input('fixedvalue') set fixedvalue(value: string | number) {
    const next = value == null ? '' : String(value);
    if (this.el.nativeElement.value !== next) this.el.nativeElement.value = next;
    schedule(this);
  }
  ngAfterViewInit(): void {
    this.ready = true;
    this.originalTitle = this.el.nativeElement.title;
    if (this.originalTitle && !this.el.nativeElement.hasAttribute('aria-label')) {
      this.el.nativeElement.setAttribute('aria-label', this.originalTitle);
    }
    this.observer = new ResizeObserver(() => schedule(this));
    this.observer.observe(this.el.nativeElement);
    document.fonts?.ready.then(() => { if (this.ready) schedule(this); });
    schedule(this);
  }
  ngDoCheck(): void {
    const value = this.el.nativeElement.value;
    if (value !== this.previousValue) { this.previousValue = value; schedule(this); }
  }
  @HostListener('input') onInput(): void { schedule(this); }
  @HostListener('change') onChange(): void { schedule(this); }
  @HostListener('window:beforeprint') beforePrint(): void { this.fit(); }
  ngOnDestroy(): void { this.ready = false; this.observer?.disconnect(); pending.delete(this); }
  fit(): void {
    const element = this.el.nativeElement;
    if (!this.ready || !element.clientWidth || !element.clientHeight) return;
    const style = getComputedStyle(element);
    const height = element.clientHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom);
    const width = element.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight) - (this.hasArrow ? 16 : 0);
    const max = Math.max(6, Math.min(this.maxInputFont, height - 1));
    let low = Math.min(6, max), high = max;
    const context = document.createElement('canvas').getContext('2d');
    const fits = (size: number): boolean => {
      element.style.fontSize = size + 'px';
      if (element.tagName === 'TEXTAREA') return element.scrollHeight <= element.clientHeight + 1 && element.scrollWidth <= element.clientWidth + 1;
      if (!context) return true;
      context.font = `${style.fontWeight} ${size}px ${style.fontFamily}`;
      const text = element instanceof HTMLSelectElement ? element.selectedOptions[0]?.text || '' : element.value;
      return context.measureText(text).width <= width;
    };
    for (let i = 0; i < 7; i++) { const mid = (low + high) / 2; if (fits(mid)) low = mid; else high = mid; }
    const overflow = !fits(Math.floor(low * 10) / 10);
    element.dataset['textOverflow'] = String(overflow);
    element.title = overflow ? `${this.originalTitle}: Full text is preserved in the character JSON. See the printable details supplement.` : this.originalTitle;
  }
}
