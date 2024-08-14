import {
  Directive,
  ElementRef,
  EventEmitter,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appElementSize]',
  standalone: true,
})
export class ElementSizeDirective implements OnInit, OnDestroy {
  @Output() handleSetElementSize: EventEmitter<{
    width: number;
    height: number;
    more: any;
  }> = new EventEmitter<{ width: number; height: number; more: any }>();
  constructor(private el: ElementRef, private zone: NgZone) {}
  observer?: any;
  ngOnInit() {
    this.observer = new ResizeObserver((entries: any) => {
      this.zone.run(() => {
        this.handleSetElementSize.emit({
          width: entries[0].target['offsetWidth'],
          height: entries[0].target['offsetHeight'],
          more: entries[0].target['offsetLeft'],
        });
      });
    });

    this.observer.observe(this.el.nativeElement);
  }
  ngOnDestroy() {
    this.observer.unobserve(this.el.nativeElement);
  }
}
