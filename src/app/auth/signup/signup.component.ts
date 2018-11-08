import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  formGroupOptions: any;

  constructor(private fb: FormBuilder, private authSvc: AuthService) {
    this.formGroupOptions = {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      birthdate: ['', [Validators.required]],
      terms: [false, [Validators.required]]
    };
  }

  ngOnInit() {
    this.signupForm = this.fb.group(this.formGroupOptions);
  }

  onSubmit({ value, valid }: { value: any; valid: boolean }): void {
    console.log(value, valid);
    if (!this.signupForm.touched || !valid) {
      return;
    }
    this.authSvc.registerUser({ email: value.email, password: value.password });
  }
}
