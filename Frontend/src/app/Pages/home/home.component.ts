import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import StoreType from '../../Store/Store';
import { SidebarComponent } from '../../Components/sidebar/sidebar.component';
import { Observable } from 'rxjs';
import { UserGroup } from '../../Types/User';

@Component({
  selector: 'app-home',
  imports: [SidebarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {

  constructor(private store : Store<StoreType>) { }
  userGroups$ : Observable<Array<UserGroup>> = new Observable();
  ngOnInit(): void {
    this.userGroups$ = this.store.select("group");
  }
}
