import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(@Inject(PLATFORM_ID) private platformId: object) { }
  setItem(key: string, value: any) {
    if (isPlatformBrowser(this.platformId)) {
      let valueStr = '';
      if (typeof value === 'object') {
        valueStr = JSON.stringify(value);
      } else {
        valueStr = value.toString();
      }
      localStorage.setItem(key, valueStr);
    }
  }
  getItem(key: string) {
    if (isPlatformBrowser(this.platformId)) {
      try {
        return JSON.parse(localStorage.getItem(key));
      } catch (e) {
        return localStorage.getItem(key);
      }
    }
  }
  clearItem(key: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(key, null);
    }
  }
  clearAll() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
    }
  }
}
