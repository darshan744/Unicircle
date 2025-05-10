import { Injectable } from '@angular/core';
import envs from '../../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ToastService } from '../ToastService/toast.service';
import IBaseResponse from '../../Types/Response';
import { LoginUser } from '../../Types/Auth';
import { Router } from '@angular/router';
import {
  GroupCreationResponse,
  ProfileResponse,
  UserGroup,
} from '../../Types/User';
import { map } from 'rxjs';
import { Store } from '@ngrx/store';
import StoreType from '../../Store/Store';
import { setGroup } from '../../Store/Groups/Group.actions';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private toastService: ToastService,
    private router: Router,
    private store: Store<StoreType>
  ) {}

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
    const formData = new FormData();
    formData.append('profileImage', image);
    const Url = `${envs.USER_URL}${this.userID}/profile`;
    console.log(Url);
    this.http
      .post<IBaseResponse<ProfileResponse>>(Url, formData)
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
    const Url = `${envs.USER_URL}${this.userID}/profile`;
    this.http.delete(Url).subscribe((e: any) => {
      this.toastService.showToast('Success', e.message, 'success');
    });
  }
  // group name checking
  checkGroupName(groupName: string) {
    const url = envs.GROUPNAME_CHECK_URL;
    const queryParams = new HttpParams().append('groupName', groupName);
    return this.http.get<IBaseResponse<{ available: boolean }>>(url, {
      params: queryParams,
    });
  }
  createGroup(groupName: string, profileImage: File | null) {
    let formData: FormData = new FormData();
    if (profileImage) {
      formData.append('profileImage', profileImage);
    }
    // we can send custom object in the formdata format itself
    // in multer we can configure to parse only the file that is appended based on the name
    // i.e for upload.single("profileImage")
    // it will parse that and be accessable with req.file
    // and the rest as req.body

    const params = new HttpParams().append('id', this.userID);
    formData.append('groupName', groupName);
    this.http
      .post<IBaseResponse<GroupCreationResponse>>(envs.GROUP_CREATE, formData, {
        params,
      })
      .subscribe((res) =>
        this.toastService.showToast(
          'Success',
          `Group ${res.data.name} is successfull`,
          'success'
        )
      );
  }
  // get user groups
  getUserGroups() {
    const url = `${envs.SINGLEUSER_GROUPS_URL}${this.userID}`;
    return this.http
      .get<IBaseResponse<UserGroup[]>>(url)
      .pipe(map((val) => val.data));
  }

  // logout
  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/']);
    this.toastService.showToast('Logout', 'Logged Out', 'info');
  }
}
