import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScreenService {
  _isMobile: boolean;
  _isPhone: boolean;
  _deviceSize: Subject<{ isMobileSize: boolean; isPhoneSize: boolean }>;
  interval: number;

  constructor() {
    this._isMobile = false;
    this._isPhone = false;
    this._deviceSize = new BehaviorSubject<{
      isMobileSize: boolean;
      isPhoneSize: boolean;
    }>({
      isMobileSize: this._isMobile,
      isPhoneSize: this._isPhone
    });
    this.interval = 50;
    window.addEventListener('resize', () => this.setDimensions());
    this.setDimensions();
  }

  setDimensions(): void {
    const width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    const height =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;
    this.setIsMobile(width, height);
    this.setIsPhone(width, height);
    this.setDeviceSize();
  }

  checkPortrait(width: number, height: number): boolean {
    return height > width ? true : false;
  }

  setIsMobile(width: number, height: number): void {
    const portrait = this.checkPortrait(width, height);
    const isMobile = width <= 992 || (width <= 1024 && portrait === true);
    this._isMobile = isMobile;
  }

  setIsPhone(width: number, height: number): void {
    const portrait = this.checkPortrait(width, height);
    const isPhone = (height <= 820 && portrait) || height <= 414 ? true : false;
    this._isPhone = isPhone;
  }

  setDeviceSize(): void {
    this._deviceSize.next({
      isMobileSize: this._isMobile,
      isPhoneSize: this._isPhone
    });
  }

  getDeviceSize(): Observable<{ isMobileSize: boolean; isPhoneSize: boolean }> {
    return this._deviceSize.asObservable().pipe(debounceTime(this.interval));
  }
}
