import { Injectable } from '@angular/core';
import { ToastService } from '../ToastService/toast.service';
import { UserService } from '../User/user.service';
import environment from '../../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PostCreationResponse, UserGroup } from '../../Types/User';
import IBaseResponse from '../../Types/Response';
@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(
    private toast: ToastService,
    private user: UserService,
    private http: HttpClient
  ) {}

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
        environment.CREATE_POST,
        formData,
        { params }
      )
      .subscribe((e) => {
        this.toast.showToast(
          'Success',
          `Post created id : ${e.data.id} , title : ${e.data.title}`,
          'success'
        );
      });
  }
}
