import {
  AfterViewInit,
  ChangeDetectorRef,
  Directive,
  HostListener,
} from '@angular/core';
import {GlobalVarsService} from "../services/global-vars.service";
import {UiVarsService} from "../services/ui-vars.service";

@Directive({
  selector: '[appWindowSize]',
  standalone: true,
})
export class WindowSizeDirective implements AfterViewInit {
  get windowRef() {
    return window;
  }

  @HostListener('click', ['$event'])
  onDomClick(event: Event) {
    if (
      (event.target as HTMLButtonElement)?.closest('.dropdownMenu') === null
    ) {
      this.globalVarsService.closeGlobalDropdown();
    }
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.uiVarsService.updateWindow('width', this.windowRef.innerWidth);
    this.uiVarsService.updateWindow('height', this.windowRef.innerHeight);
  }
  constructor(
    private ref: ChangeDetectorRef,
    private uiVarsService: UiVarsService,
    private globalVarsService: GlobalVarsService
  ) {}
  ngAfterViewInit() {
    this.onWindowResize();
    this.ref.detectChanges();
  }
}
