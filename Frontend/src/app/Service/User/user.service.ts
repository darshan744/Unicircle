import { Injectable } from '@angular/core';
import envs from '../../../environments/environment.development'
import { HttpClient } from '@angular/common/http';
import { ToastService } from '../ToastService/toast.service';
import IBaseResponse from '../../Types/Response';
import { LoginUser } from '../../Types/Auth';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient , private toastService : ToastService , private router : Router) { }

  // getProfileImage() {}
  get userID() {
    const user = localStorage.getItem("user");
    const userObj = JSON.parse(user || "{}");
    return userObj.id
  }
  get user() {
     const userStr = localStorage.getItem('user');
     const user: LoginUser = JSON.parse(userStr || '{}');
     return user;
  }
  uploadProfileImage(image : File) {
    const formData = new FormData();
    formData.append('profileImage', image);
    const Url = `${envs.USER_URL}${this.userID}/profile`;
    console.log(Url);
    this.http.post<IBaseResponse<ProfileResponse>>(Url, formData).subscribe(res => {
      if(res.data.url) {
        const user: LoginUser = this.user;
        user.profileImage = res.data.url;
        localStorage.setItem("user" , JSON.stringify(user));
        this.toastService.showToast('Success', res.message, 'success');
      }
      else {
        this.toastService.showToast("Error" , res.message , "error")
      }
    });
  }

  deleteProfileImage() {
    const Url = `${envs.USER_URL}${this.userID}/profile`
    this.http.delete(Url).subscribe((e:any) => {
      this.toastService.showToast("Success" , e.message , "success")
    });
  }

  logout() {
    localStorage.removeItem("user");
    this.router.navigate(["/"])
    this.toastService.showToast("Logout" ,"Logged Out" , "info")
  }
}
