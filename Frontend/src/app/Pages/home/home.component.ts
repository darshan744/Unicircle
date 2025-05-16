import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import StoreType from '../../Store/Store';
import { SidebarComponent } from '../../Components/sidebar/sidebar.component';
import { Observable } from 'rxjs';
import { UserGroup, UserPost } from '../../Types/User';
import { CommonModule } from '@angular/common';
import { PostComponent } from "../../Components/post/post.component";

@Component({
  selector: 'app-home',
  imports: [SidebarComponent, CommonModule, PostComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {

  constructor(private store : Store<StoreType>) { }
  userGroups$ : Observable<Array<UserGroup>> = new Observable();
  posts$ : Observable<UserPost[]> = new Observable();
  ngOnInit(): void {
    this.userGroups$ = this.store.select("group");
    this.posts$ = this.store.select("posts")
  }
}
