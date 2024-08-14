import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UiVarsService {

  windowWidth = signal(0);
  windowHeight = signal(0);
  constructor() { }

  updateWindow(type:'width'|'height',size:number){
    if(type === 'width'){
      this.windowWidth.set(size);
    }
    if(type === 'height'){
      this.windowHeight.set(size);
    }
  }
}
