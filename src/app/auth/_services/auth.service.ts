import { Injectable } from '@angular/core';
import { IUser } from '../_interfaces/user.interface';
import { IAuthData } from '../_interfaces/auth-data.interface';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { TrainingService } from 'src/app/training/_services/training.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private _user: IUser;
  private isAuthenticated = false;
  authChange = new Subject<boolean>();

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private trainingSvc: TrainingService
  ) {}

  initAuthListener() {
    this.afAuth.authState.subscribe(user =>
      user ? this.authSuccess() : this.logout()
    );
  }

  registerUser(authData: IAuthData) {
    // this._user = {
    //   userId: Math.round(Math.random() * 10000).toString(),
    //   email: authData.email
    // };
    this.afAuth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        console.log(result);
        // this.authSuccess();
      })
      .catch(error => console.log(error));
  }

  login(authData: IAuthData) {
    // this._user = {
    //   userId: Math.round(Math.random() * 10000).toString(),
    //   email: authData.email
    // };
    this.afAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => console.log(result))
      .catch(error => console.log(error));
    // error obj can be used to render help
  }

  logout(): void {
    // this._user = null;
    this.trainingSvc.cancelSubscriptions();
    this.afAuth.auth.signOut();
    this.isAuthenticated = false;
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }

  // getUser(): IUser {
  //   return { ...this._user };
  // }

  isAuth(): boolean {
    return this.isAuthenticated;
  }

  private authSuccess(): void {
    this.isAuthenticated = true;
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }
}
