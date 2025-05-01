import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { CommonModule } from '@angular/common';
import {FloatLabelModule} from 'primeng/floatlabel'
import {CardModule} from 'primeng/card'
import { MessageModule} from 'primeng/message';
import {  FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {isPasswordStrong} from '../../Utils/PasswordValidator'
@Component({
  selector: 'app-login',
  imports: [
    InputTextModule,
    ButtonModule,
    PasswordModule,
    CommonModule,
    FloatLabelModule,
    CardModule,
    ReactiveFormsModule,
    MessageModule,
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  isLogin: boolean = false;
  signUpData = new FormGroup({
    userName: new FormControl<string | null>(null, [Validators.required]),
    email: new FormControl<string | null>(null, [
      Validators.required,
      Validators.email,
    ]),
    name: new FormControl<string | null>(null, [Validators.required]),
    password: new FormControl<string | null>(null, [
      Validators.required,
      Validators.minLength(8),
      isPasswordStrong,
    ]),
  });
  loginInput = new FormGroup({
    email: new FormControl<string | null>(null, [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl<string | null>(null, [
      Validators.required,
      Validators.minLength(8),
      isPasswordStrong,
    ]),
  });

  get loginEmail() {
    return this.loginInput.get('email');
  }
  get loginPasword(){ return this.loginInput.get("password")}
  login() {
   if(this.loginInput.invalid){
    this.loginInput.markAllAsTouched()
    return;
   }
  }
  signup() {

  }
  checkUserNameAvailable() {}
}
