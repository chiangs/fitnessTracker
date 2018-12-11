import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [AngularFireAuthModule, SharedModule]
})
export class AuthModule {}
