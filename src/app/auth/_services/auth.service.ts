import { Injectable } from '@angular/core';
import { IUser } from '../_interfaces/user.interface';
import { IAuthData } from '../_interfaces/auth-data.interface';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user: IUser;
  authChange = new Subject<boolean>();

  constructor(private router: Router) {}

  registerUser(authData: IAuthData) {
    this._user = {
      userId: Math.round(Math.random() * 10000).toString(),
      email: authData.email
    };
    this.authSuccess();
  }

  login(authData: IAuthData) {
    this._user = {
      userId: Math.round(Math.random() * 10000).toString(),
      email: authData.email
    };
    this.authSuccess();
  }

  logout(): void {
    this._user = null;
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }

  getUser(): IUser {
    return { ...this._user };
  }

  isAuth(): boolean {
    return this._user != null;
  }

  private authSuccess(): void {
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }
}
