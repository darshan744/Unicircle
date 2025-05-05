import { Component, signal, Signal, WritableSignal } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { CommonModule } from '@angular/common';
import {FloatLabelModule} from 'primeng/floatlabel'
import {CardModule} from 'primeng/card'
import { MessageModule} from 'primeng/message';
import {  FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {isPasswordStrong} from '../../Utils/PasswordValidator'
import { AuthService } from '../../Service/Auth/auth.service';
import { ToastService } from '../../Service/ToastService/toast.service';
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
  constructor(private authService : AuthService , private toastService :ToastService){}
  userNameTakenVisible = signal(false);
  userNameTakenMessage : WritableSignal<string> = signal("");
  userNameTakenStyle : WritableSignal<"warn" | "success"> = signal("warn")
  userNameTakenBoolean : WritableSignal<boolean> = signal(false);
  isLogin: boolean = true;
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
   const email = this.loginInput.controls.email.value;
   const password = this.loginInput.controls.password.value;
   if(email && password) {
      this.authService.login({email , password})
   }
  }
  signup() {
    if(this.signUpData.invalid) {
      this.toastService.showToast("Invalid" , "form is Invalid",'info');
      return;
    }
    const email = this.signUpData.controls.email.value;
    const name = this.signUpData.controls.name.value;
    const password = this.signUpData.controls.password.value;
    const userName = this.signUpData.controls.userName.value;
    if (
      name !== null &&
      email !== null &&
      userName !== null &&
      password !== null &&
      !this.userNameTakenBoolean()
    ) {
      this.authService.signup({ email, userName, name, password });
    }


  }
  checkUserNameAvailable() {
    const control = this.signUpData.get('userName');
    if (!control) {
      this.userNameTakenVisible.set(false);
      return;
    };
    if(control.valid && control.value !== null){
      this.authService.checkUserName(control.value).subscribe(
        (res) => {
          this.userNameTakenVisible.set(true);
          this.userNameTakenMessage.set(res.message);
          this.userNameTakenBoolean.set(res.data.userExist);
          this.userNameTakenStyle.set(res.data.userExist ? "warn" : 'success');
        }
      );
    }

  }
}
