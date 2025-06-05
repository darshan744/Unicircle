import { Injectable } from '@angular/core';
import { ToastService } from '../ToastService/toast.service';
import { UserService } from '../User/user.service';
import environment from '../../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  GroupPostsResponse,
  PostCreationResponse,
  UserGroup,
  UserPostResponse,
} from '../../Types/User';
import IBaseResponse from '../../Types/Response';
import StoreType from '../../Store/Store';
import { Store } from '@ngrx/store';
import { initPost } from '../../Store/Post/Post.actions';
@Injectable({
  providedIn: 'root',
})
export class PostService {
  postUrl = environment.api + "/posts"
  constructor(
    private toast: ToastService,
    private user: UserService,
    private http: HttpClient,
    private store: Store<StoreType>
  ) { }

  createPost(
    post: {
      title: string;
      tags: string[];
      description: string;
      group: string;
    },
    imageFiles?: File[]
  ) {
    let formData = new FormData();
    if (imageFiles) {
      imageFiles.forEach((file) => {
        formData.append('Images', file, file.name);
      });
    }
    formData.append('data', JSON.stringify(post));
    const params = new HttpParams().append('id', this.user.userID);
    this.http
      .post<IBaseResponse<PostCreationResponse>>(
        this.postUrl,
        formData,
        { params, withCredentials: true }
      )
      .subscribe((e) => {
        this.toast.showToast(
          'Success',
          `Post created id : ${e.data.id} , title : ${e.data.title}`,
          'success'
        );
        this.store.dispatch(initPost());
      });
  }

  getUserPost() {
    const url = `${this.postUrl}/user/${this.user.userID}`;
    return this.http.get<IBaseResponse<UserPostResponse>>(url, { withCredentials: true });
  }
  getGroupPosts(groupId: string) {
    const url = `${this.postUrl}/group/${groupId}`
    return this.http.get<IBaseResponse<GroupPostsResponse[]>>(url, { withCredentials: true })
  }

}
