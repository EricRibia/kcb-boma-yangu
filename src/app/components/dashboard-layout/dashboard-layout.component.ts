// import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
// import { StaticDataService } from '../../services/static-data.service';
// import { UiVarsService } from '../../services/ui-vars.service';
// import { NavigationEnd, Router } from '@angular/router';
// import { GlobalVarsService } from '../../services/global-vars.service';
// import { AlertsService } from '../../services/alerts.service';
// import { filter } from 'rxjs';
// import { ElementSizeDirective } from '../../directives/element-size.directive';
//
// @Component({
//   selector: 'app-dashboard-layout',
//   standalone: true,
//   imports: [ElementSizeDirective],
//   templateUrl: './dashboard-layout.component.html',
//   styleUrl: './dashboard-layout.component.css',
// })
// export class DashboardLayoutComponent implements OnInit, OnDestroy, DoCheck {
//   navOpen = true;
//   sideNavSize = '270px';
//   smallScreen = false;
//   toggleNav(typ: boolean) {
//     this.navOpen = typ;
//     this.sideNavSize = typ ? '270px' : '0';
//   }
//   subID: any = null;
//   subActive: string = '';
//   // menus = this.staticData.sideBarOptions;
//   // authData = this.globalVarsService.authData;
//   subMenuVisible: string[] = [];
//   constructor(
//     // private staticData: StaticDataService,
//     private uiVarsService: UiVarsService,
//     private router: Router,
//     private globalVarsService: GlobalVarsService,
//     private alertsService: AlertsService
//   ) {
//     // Listen for route changes
//     // this.subID = this.router.events
//     //   .pipe(filter((event) => event instanceof NavigationEnd))
//     //   .subscribe((event) => {
//     //     if (event instanceof NavigationEnd) {
//     //       this.globalVarsService.updateActiveRoute(event.url);
//     //     }
//     //   });
//   }
//
//   // activeRoute = this.globalVarsService.activeRoute;
//   activateSubMenu(menuID: string) {
//     const isActive = this.subMenuVisible.find((menu) => menu === menuID);
//     if (isActive) {
//       this.subMenuVisible = this.subMenuVisible.filter(
//         (menu) => menu !== menuID
//       );
//     } else {
//       this.subMenuVisible.push(menuID);
//     }
//   }
//
//   goToRoute(url: string, menuID: string, isSubMenu?: boolean) {
//     if (isSubMenu) {
//       this.router.navigateByUrl(url);
//       return;
//     }
//     if (url) {
//       this.router.navigateByUrl(url);
//     } else {
//       const routeData = this.staticData.sideBarOptions.find(
//         (menu) => menu.title === menuID
//       );
//       if (routeData && routeData.hasSub) {
//         this.activateSubMenu(menuID);
//       } else {
//         this.alertsService.handleToast({
//           message: 'Coming Soon!',
//           typ: 'info',
//         });
//       }
//     }
//   }
//
//   isActive(current: string) {
//     return this.subMenuVisible.find((menu) => menu === current);
//   }
//
//   topNavHeight = 0;
//   setElementSizes(event: { width: number; height: number; more: any }) {
//     this.topNavHeight = event.height;
//   }
//
//   checkScreenSize() {
//     if (this.uiVarsService.windowWidth() <= 900 && !this.smallScreen) {
//       this.smallScreen = true;
//       this.sideNavSize = '0';
//       this.navOpen = false;
//     } else if (this.uiVarsService.windowWidth() > 900 && this.smallScreen) {
//       this.smallScreen = false;
//       this.sideNavSize = '270px';
//       this.navOpen = true;
//     }
//   }
//   ngDoCheck() {
//     this.checkScreenSize();
//   }
//   currentRoute = '';
//   ngOnInit(): void {
//     this.navOpen = !this.smallScreen;
//   }
//
//   ngOnDestroy() {
//     if (this.subID) {
//       this.subID.unsubscribe();
//     }
//   }
// }
