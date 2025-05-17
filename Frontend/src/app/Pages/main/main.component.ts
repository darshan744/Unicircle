import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import StoreType from '../../Store/Store';
import { initGroup } from '../../Store/Groups/Group.actions';
import { initPost } from '../../Store/Post/Post.actions';

import { ToolbarComponent } from '../../Components/toolbar/toolbar.component';
import { SidebarComponent } from '../../Components/sidebar/sidebar.component';
import { UserGroup } from '../../Types/User';

@Component({
  selector: 'app-main',
  imports: [RouterOutlet, ToolbarComponent, SidebarComponent , CommonModule],
  templateUrl: './main.component.html',
})
export class MainComponent {
  isNavBarOpenedSignal = signal(false);
  constructor(private store: Store<StoreType>) {
    this.store.dispatch(initGroup());
    this.store.dispatch(initPost());
  }
  groups$: Observable<UserGroup[]> = new Observable();
  ngOnInit(): void {
    this.groups$ = this.store.select('group');
  }
  openNavHandler(isNavBarOpened: boolean): void {
    this.isNavBarOpenedSignal.set(isNavBarOpened);
  }
}
