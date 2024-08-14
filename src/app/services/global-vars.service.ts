import { Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { DecodedTokenDataT } from '../types/in-app';
import { jwtDecode } from 'jwt-decode';
import { StaticDataService } from './static-data.service';
import { AlertsService } from './alerts.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class GlobalVarsService {
  activeRoute: WritableSignal<{
    url: string;
    label: string;
  } | null> = signal(null);

  authData: WritableSignal<DecodedTokenDataT | null> = signal(null);

  private _dropdownMenuOpen: BehaviorSubject<boolean> = new BehaviorSubject(
    false
  );
  get dropdownMenuOpen() {
    return this._dropdownMenuOpen.asObservable();
  }
  private get tokenData(): any | null {
    const tokenData = this.localStorageService.getItem('access_token');
    if (tokenData) {
      return jwtDecode(tokenData.access_token);
    }
    return null;
  }
  constructor(
    private localStorageService: LocalStorageService,
    private staticData: StaticDataService,
    private alertsService: AlertsService,
    private router: Router
  ) {}
  openGlobalDropdown() {
    this._dropdownMenuOpen.next(true);
  }
  closeGlobalDropdown() {
    this._dropdownMenuOpen.next(false);
  }

  updateAuth() {
    const tokenData: DecodedTokenDataT = this.tokenData;
    // todo update auth data
    if (!tokenData) {
      this.authData.set(null);
    }
    if (this.tokenExpired(tokenData.nbf)) {
      this.authData.set(null);
    } else {
      this.authData.set(tokenData);
    }
  }

  tokenExpired(nbfTIme: number) {
    if (nbfTIme) {
      return nbfTIme < Math.floor(Date.now() / 1000);
    } else {
      return true;
    }
  }

  updateActiveRoute(url: string) {
    const route = this.staticData.sideBarOptions.find(
      (route) => route.route === url
    );
    if (route) {
      this.activeRoute.set({
        label: route.title,
        url: route.route,
      });
    }
  }

  logOut() {
    this.localStorageService.clearStorage();
    this.updateAuth();
    this.alertsService.handleToast({
      typ: 'info',
      message: 'Logged out successfully!',
    });
    this.router.navigateByUrl('/');
  }
}
