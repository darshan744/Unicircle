import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { UserGroup, UserPost } from '../../Types/User';
import StoreType from '../../Store/Store';
import { PostCardComponent } from '../../Components/post-card/post-card.component';


@Component({
  selector: 'app-home',
  imports: [CommonModule, PostCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor(private store: Store<StoreType>) {}
  userGroups$: Observable<Array<UserGroup>> = new Observable();
  posts$: Observable<UserPost[]> = new Observable();
  ngOnInit(): void {
    this.userGroups$ = this.store.select("group")
    this.posts$ = this.store.select('posts');
  }
}
