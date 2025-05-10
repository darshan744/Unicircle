import { Component, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { CardModule } from 'primeng/card';
import { Avatar } from 'primeng/avatar';

import { UserGroup } from '../../Types/User';
import StoreType from '../../Store/Store';
@Component({
  selector: 'app-user-group-list',
  imports: [AsyncPipe, CardModule, CommonModule, Avatar],
  templateUrl: './user-group-list.component.html',
  styleUrl: './user-group-list.component.css',
})
export class UserGroupListComponent implements OnInit {
  constructor(private store: Store<StoreType>) {}
  groups: Observable<UserGroup[]> = new Observable();
  ngOnInit(): void {
    this.groups = this.store.select('group');
  }
}
