import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import environment from '../../../environments/environment.development';
import { ILogin, ISignup, LoginReponse, UserNameCheck } from '../../Types/Auth';
import IBaseResponse from '../../Types/Response';
import { Observable } from 'rxjs';
import { ToastService } from '../ToastService/toast.service';
import { Router } from '@angular/router';
import StoreType from '../../Store/Store';
import { Store } from '@ngrx/store';
import { setUser } from '../../Store/User/User.actions';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authUrl = environment.api
  constructor(
    private http: HttpClient,
    private toastSerivce: ToastService,
    private router: Router,
    private store: Store<StoreType>
  ) {}

  login(data: ILogin) {
    const loginUrl = this.authUrl + "/auth/login"
    const sub = this.http.post<IBaseResponse<LoginReponse>>(
      loginUrl,
      { user: data  } , {withCredentials : true}
    );
    sub.subscribe({
      next: (res) => {
        this.toastSerivce.showToast('Success', res.message, 'success');
        this.store.dispatch(setUser({ value: res.data.user }));
        this.router.navigate(['user', 'home']);
        localStorage.setItem('user', JSON.stringify(res.data.user));
      },
    });
  }
  signup(data: ISignup) {
    const signupUrl = this.authUrl + "/auth/signup"
    this.http
      .post<IBaseResponse<undefined>>(signupUrl, { user: data })
      .subscribe({
        next: (res) => {
          this.toastSerivce.showToast('Success', res.message, 'success');
          // this.router.navigate(['user' , res.dat])
        },
      });
  }

  checkUserName(userName: string) {

    const checkUserNameUrl = this.authUrl + "/checkUserName"
    const httpParams = new HttpParams().append('userName', userName);
    const observable: Observable<IBaseResponse<UserNameCheck>> = this.http.get<
      IBaseResponse<UserNameCheck>
    >(checkUserNameUrl, { params: httpParams });
    return observable;
  }
}
