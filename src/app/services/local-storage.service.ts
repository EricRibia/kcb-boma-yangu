import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  getItem(key: 'access_token' | 'expiry') {
    const stringValue = localStorage.getItem(key);
    if (stringValue) {
      return JSON.parse(stringValue);
    } else {
      return null;
    }
  }

  setItem(key: 'access_token' | 'expiry', value: string) {
    const stringValue = JSON.stringify({
      [key]: value,
    });
    localStorage.setItem(key, stringValue);
  }

  clearStorage() {
    localStorage.clear();
  }
}
