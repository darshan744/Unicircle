import { Injectable } from '@angular/core';
import envs from '../../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ToastService } from '../ToastService/toast.service';
import IBaseResponse from '../../Types/Response';
import { LoginUser } from '../../Types/Auth';
import { Router } from '@angular/router';
import {
  GroupCreationResponse,
  GroupPostsResponse,
  ProfileResponse,
  UserGroup,
} from '../../Types/User';
import { map } from 'rxjs';
import { Store } from '@ngrx/store';
import StoreType from '../../Store/Store';
import { initGroup } from '../../Store/Groups/Group.actions';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = envs.api
  userUrl = envs.api + "/users"
  groupUrl = envs.api + "/groups"
  constructor(
    private http: HttpClient,
    private toastService: ToastService,
    private router: Router,
    private store: Store<StoreType>
  ) { }

  // userid
  get userID() {
    const userObj = this.user;
    return userObj.id;
  }
  // user
  get user() {
    const userStr = localStorage.getItem('user');
    const user: LoginUser = JSON.parse(userStr || '{}');
    return user;
  }
  //upload profile image
  uploadProfileImage(image: File) {
    const url = `${this.userUrl}/${this.userID}/profile`
    const formData = new FormData();
    formData.append('profileImage', image);
    this.http
      .post<IBaseResponse<ProfileResponse>>(url, formData, { withCredentials: true })
      .subscribe((res) => {
        if (res.data.url) {
          const user: LoginUser = this.user;
          user.profileImage = res.data.url;
          localStorage.setItem('user', JSON.stringify(user));
          this.toastService.showToast('Success', res.message, 'success');
        } else {
          this.toastService.showToast('Error', res.message, 'error');
        }
      });
  }
  // delete profile image
  deleteProfileImage() {
    const url = `${this.userUrl}/${this.userID}/profile`
    this.http.delete(url).subscribe((e: any) => {
      this.toastService.showToast('Success', e.message, 'success');
    });
  }
  // group name checking
  checkGroupName(groupName: string) {
    const url = this.groupUrl + "/checkGroupName"
    const queryParams = new HttpParams().append('groupName', groupName);
    return this.http.get<IBaseResponse<{ available: boolean }>>(url, {
      params: queryParams, withCredentials: true
    });
  }
  createGroup(groupName: string, profileImage: File | null) {
    let formData: FormData = new FormData();
    if (profileImage) {
      formData.append('profileImage', profileImage);
    }
    // we can send custom object in the formdata format itself
    // in multer we can configure to parse only the file that is appended based on the name
    //
    //
    // i.e for upload.single("profileImage")
    // it will parse that and be accessable with req.file
    // and the rest as req.body
    const url = this.groupUrl + "/"
    const params = new HttpParams().append('id', this.userID);
    formData.append('groupName', groupName);
    this.http
      .post<IBaseResponse<GroupCreationResponse>>(url, formData, {
        params, withCredentials: true
      })
      .subscribe((res) => {
        this.toastService.showToast(
          'Success',
          `Group ${res.data.name} is successfull`,
          'success'
        );
        this.store.dispatch(initGroup())
      }
      );
  }
  // get user groups
  getUserGroups() {
    const url = `${this.groupUrl}/${this.userID}`
    return this.http
      .get<IBaseResponse<UserGroup[]>>(url, { withCredentials: true })
      .pipe(map((val) => val.data));
  }
  // logout
  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/']);
    this.toastService.showToast('Logout', 'Logged Out', 'info');
  }
}
