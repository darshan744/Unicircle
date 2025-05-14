import {
  Component,
  model,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { ToolbarModule } from 'primeng/toolbar';
import { Avatar, AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { InputIconModule } from 'primeng/inputicon';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { MenuModule } from 'primeng/menu';
import { UserService } from '../../Service/User/user.service';
import { Store } from '@ngrx/store';
import StoreType from '../../Store/Store';
import { Observable } from 'rxjs';
import { toggle } from '../../Store/Theme/Theme.actions';
import { Select } from 'primeng/select';
import { UserGroup } from '../../Types/User';
@Component({
  selector: 'app-toolbar',
  imports: [
    ToolbarModule,
    AvatarModule,
    ButtonModule,
    IconFieldModule,
    InputTextModule,
    InputIconModule,
    ToggleSwitchModule,
    CommonModule,
    MenuModule,
    RouterLink,
    FormsModule,
  ],
  templateUrl: './toolbar.component.html',
})
export class ToolbarComponent implements OnInit {
  userGroups$ : Observable<UserGroup[]> = new Observable()
  constructor(
    private userService: UserService,
    private router: Router,
    private store: Store<StoreType>
  ) {
    this.userGroups$ = this.store.select("group");
    this.theme$ = this.store.select('theme');
  }
  theme$: Observable<boolean>;
  themeSignal = model(false);
  ngOnInit(): void {
    if (localStorage['theme'] === 'dark') {
      this.themeSignal.set(true);
    } else {
      this.themeSignal.set(false);
    }
  }
  toggleTheme(event: boolean) {
    const html = document.querySelector('html');
    this.store.dispatch(toggle({ darkMode: event }));
  }

  logout() {
    this.userService.logout();
  }

  navigateToHome() {
    this.router.navigate(['user', this.userService.userID, 'home']);
  }

  navigateCreate() {
    this.router.navigate(['user', this.userService.userID, 'create']);
  }
}
