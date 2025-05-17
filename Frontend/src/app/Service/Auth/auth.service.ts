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
import { initGroup } from '../../Store/Groups/Group.actions';
import { initPost } from '../../Store/Post/Post.actions';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private toastSerivce: ToastService,
    private router: Router,
    private store: Store<StoreType>
  ) {}
  
  login(data: ILogin) {
    const sub = this.http.post<IBaseResponse<LoginReponse>>(
      environment.LOGIN_URL,
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
    this.http
      .post<IBaseResponse<undefined>>(environment.SIGNUP_URL, { user: data })
      .subscribe({
        next: (res) => {
          this.toastSerivce.showToast('Success', res.message, 'success');
          // this.router.navigate(['user' , res.dat])
        },
      });
  }

  checkUserName(userName: string) {
    const httpParams = new HttpParams().append('userName', userName);
    const observable: Observable<IBaseResponse<UserNameCheck>> = this.http.get<
      IBaseResponse<UserNameCheck>
    >(environment.USERNAME_URL, { params: httpParams });
    return observable;
  }
}
