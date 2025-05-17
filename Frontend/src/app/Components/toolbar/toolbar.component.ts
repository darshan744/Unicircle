import {
  Component,
  model,
  OnInit,
  output,
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

  navBarOutputSignal = output<boolean>();
  isNavBarOpened : boolean = false;
  constructor(
    private userService: UserService,
    private router: Router,
    private store: Store<StoreType>
  ) {
    this.theme$ = this.store.select('theme');
  }
  theme$: Observable<boolean>;
  themeSignal = model(false);

  get userId () :string {
   return this.userService.userID
  }

  ngOnInit(): void {
    if (localStorage['theme'] === 'dark') {
      this.themeSignal.set(true);
    } else {
      this.themeSignal.set(false);
    }
    this.openNavBar()
  }
  toggleTheme(event: boolean) {
    const html = document.querySelector('html');
    this.store.dispatch(toggle({ darkMode: event }));
  }

  openNavBar () : void {
    this.isNavBarOpened = !this.isNavBarOpened
    this.navBarOutputSignal.emit(this.isNavBarOpened);
  }
  logout() {
    this.userService.logout();
  }

  navigateToHome() {
    this.router.navigate(['user', 'home']);
  }

  navigateCreate() {
    this.router.navigate(['user', this.userService.userID, 'create']);
  }
}
