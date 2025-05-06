import { Injectable } from '@angular/core';
import envs from '../../../environments/environment.development'
import { HttpClient, HttpParams } from '@angular/common/http';
import { ToastService } from '../ToastService/toast.service';
import IBaseResponse from '../../Types/Response';
import { LoginUser } from '../../Types/Auth';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient , private toastService : ToastService , private router : Router) { }

  // userid
  get userID() {
    const userObj = this.user;
    return userObj.id
  }
  // user
  get user() {
     const userStr = localStorage.getItem('user');
     const user: LoginUser = JSON.parse(userStr || '{}');
     return user;
  }
  //upload profile image
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
  // delete profile image
  deleteProfileImage() {
    const Url = `${envs.USER_URL}${this.userID}/profile`
    this.http.delete(Url).subscribe((e:any) => {
      this.toastService.showToast("Success" , e.message , "success")
    });
  }
  // group name checking
  checkGroupName(groupName : string) {
    const url = envs.GROUPNAME_CHECK_URL
    const queryParams = new HttpParams().append('groupName', groupName);
    return this.http.get<IBaseResponse<{available:boolean}>>(url  ,{params:queryParams});
  }
  createGroup(groupName : string , profileImage : File | null) {
    
  }





  // logout
  logout() {
    localStorage.removeItem("user");
    this.router.navigate(["/"])
    this.toastService.showToast("Logout" ,"Logged Out" , "info")
  }


}
