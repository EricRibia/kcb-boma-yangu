import { Injectable } from '@angular/core';
import { SidebarOptionsT } from '../types/in-app';

@Injectable({
  providedIn: 'root',
})
export class StaticDataService {
  sideBarOptions: SidebarOptionsT[] = [
    {
      title: 'Users',
      route: '/users',
      hasSub: false,
      icon: 'assets/icons/list-icon.svg',
      subMenus: [],
    },
  ];
}
