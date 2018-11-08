import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAuthData } from '../_interfaces/auth-data.interface';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  formGroupOptions = {
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  };
  showPassword = false;
  emailLabel = 'What is your email address?';
  emailHint = 'email@email.email';
  passwordLabel = 'Enter a passphrase';
  passLabel = 'Passphrase or password';
  passHint = 'At least 6 characters';
  LoginText = 'Login';
  emailFormatError = `Please enter a valid email address`;
  emailRequiredError = `Email is required`;
  passwordError = 'This field is required';

  constructor(private fb: FormBuilder, private authSvc: AuthService) {
    this.loginForm = this.fb.group(this.formGroupOptions);
  }

  ngOnInit() {}

  onSubmit({ value, valid }: { value: IAuthData; valid: boolean }): void {
    if (!this.loginForm.touched || !valid) {
      return;
    }
    this.authSvc.login({ email: value.email, password: value.password });
  }

  clearEmail(): void {
    this.loginForm.get('email').setValue('');
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
}
