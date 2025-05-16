import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import StoreType from '../../Store/Store';
import { UserPost } from '../../Types/User';

@Injectable({
  providedIn: 'root',
})
export class PostSharedService {

  post$: Observable<UserPost[]> = new Observable();
  constructor(private store: Store<StoreType>) {
    this.post$ = this.store.select('posts');
  }
  

}
