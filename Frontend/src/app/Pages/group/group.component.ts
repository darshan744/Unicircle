import { AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, } from '@angular/router';
import { Store } from '@ngrx/store';
import { Avatar } from 'primeng/avatar'
import StoreType from '../../Store/Store';
import { map, Observable, switchMap, tap } from 'rxjs';
import { GroupPostsResponse, UserGroup, UserPost } from '../../Types/User';
import { PostCardComponent } from '../../Components/post-card/post-card.component'
import { Button } from 'primeng/button';
import { PostService } from '../../Service/Post/post.service';
import { groupPosts } from '../../Store/Post/Post.actions';
@Component({
  selector: 'app-group',
  imports: [AsyncPipe, Avatar, PostCardComponent, CommonModule, Button],
  templateUrl: './group.component.html',
  styleUrl: './group.component.css'
})
export class GroupComponent implements OnInit {

  constructor(private store: Store<StoreType>, private service: PostService) { }
  readonly router = inject(ActivatedRoute);
  readonly cdr = inject(ChangeDetectorRef)
  group$: Observable<UserGroup | undefined> = new Observable()
  posts$: Observable<GroupPostsResponse[]> = new Observable();
  ngOnInit(): void {
    this.posts$ = this.store.select("groupPost")
    this.router.paramMap.pipe(
      map(params => params.get("groupId")),
      tap(id => this.store.dispatch(groupPosts({ groupId: id ?? "" })))
    ).subscribe()
    this.group$ = this.router.paramMap.pipe(
      map(params => params.get("groupId")),
      switchMap(groupId => this.store.select("group").pipe(
        map(groups => groups.find(grp => grp.id === groupId))
      ))

    )

  }
  getGroupProfileImage(post: UserPost | undefined, iconOrImage: "icon" | "img") {
    if (post === undefined) return undefined
    const profileImage = post.group.groupProfileImage
    if (iconOrImage === "icon") {
      const groupname = post.group.name;
      console.log(groupname)
      return profileImage === null ? groupname.charAt(0) : undefined;
    }
    return profileImage !== null ? profileImage : undefined
  }
}
