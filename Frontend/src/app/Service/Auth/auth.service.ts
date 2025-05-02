import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import environment from '../../../environments/environment.development';
import { ILogin, ISignup, LoginReponse, UserNameCheck } from '../../Types/Auth';
import IBaseResponse from '../../Types/Response';
import { Observable } from 'rxjs';
import { ToastService } from '../ToastService/toast.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient , private toastSerivce : ToastService) { }

  login(data: ILogin) {
    const sub = this.http.post<IBaseResponse<LoginReponse>>(environment.LOGIN_URL, {user:data});
    sub.subscribe({
      next:(res)=>{
        this.toastSerivce.showToast("Success" , res.message , "success");
      }
    })
  }
  signup(data: ISignup) {
      console.log(data)
      this.http.post<IBaseResponse<undefined>>(environment.SIGNUP_URL , {user:data}).subscribe({
        next:(res)=>{this.toastSerivce.showToast("Success" , res.message ,"success" )},
        error:(error)=>{this.toastSerivce.showToast("Error" , error.message , "danger")}
      })
  }

  checkUserName(userName: string) {
    const httpParams = new HttpParams().append("userName", userName);
    const observable: Observable<IBaseResponse<UserNameCheck>> = this.http.get<IBaseResponse<UserNameCheck>>(environment.USERNAME_URL, { params: httpParams });
    return observable;
  }
}
