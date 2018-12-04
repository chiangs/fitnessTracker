import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Subject } from 'rxjs';
import { UiService } from 'src/app/shared/_services/ui.service';
import { TrainingService } from 'src/app/training/_services/training.service';
import { IAuthData } from '../_interfaces/auth-data.interface';

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
    private trainingSvc: TrainingService,
    // private snackbar: MatSnackBar,
    private uiSvc: UiService
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
    this.uiSvc.loadingStateChanged.next(true);
    this.afAuth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.uiSvc.loadingStateChanged.next(false);
        // this.authSuccess();
      })
      .catch(error => {
        this.uiSvc.loadingStateChanged.next(false);
        // this.snackbar.open(error.message, null, { duration: 3000 });
        this.uiSvc.showSnackBar(error.message, null, { duration: 3000 });
      });
  }

  login(authData: IAuthData) {
    // this._user = {
    //   userId: Math.round(Math.random() * 10000).toString(),
    //   email: authData.email
    // };
    this.uiSvc.loadingStateChanged.next(true);
    this.afAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => this.uiSvc.loadingStateChanged.next(false))
      .catch(error => {
        this.uiSvc.loadingStateChanged.next(false);
        // this.snackbar.open( error.message, null, { duration: 3000 } );
        this.uiSvc.showSnackBar(error.message, null, { duration: 3000 });
      });
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
