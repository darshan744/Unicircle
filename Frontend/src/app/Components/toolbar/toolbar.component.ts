import { Component, model, OnInit, output } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
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
import { Observable, window } from 'rxjs';
import { toggle } from '../../Store/Theme/Theme.actions';
import { MenuItem } from 'primeng/api';
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
  isNavBarOpened: boolean = false;
  menuItem: MenuItem[] = [];
  constructor(
    private userService: UserService,
    private router: Router,
    private store: Store<StoreType>,
    private activatedRoute: ActivatedRoute,
  ) {
    this.theme$ = this.store.select('theme');
  }
  theme$: Observable<boolean>;
  themeSignal = model(false);

  get userId(): string {
    return this.userService.userID;
  }

  ngOnInit(): void {
    if (localStorage['theme'] === 'dark') {
      this.themeSignal.set(true);
    } else {
      this.themeSignal.set(false);
    }
    this.openNavBar();
    this.menuItem = [
      {
        label: 'Profile',
        icon: 'pi pi-user',
        command: () => this.navigateProfile(),
      },
      {
        label: 'Settings',
        icon: 'pi pi-cog',
        routerLink: ['settings'],
      },
      {
        label: 'Theme',
        icon: 'pi pi-moon',
        items: [
          {
            label: 'Toggle Theme',
            icon: 'pi pi-moon',
            command: () => this.toggleTheme(!this.theme$),
          },
        ],
      },
    ];
  }
  toggleTheme(event: boolean) {
    const html = document.querySelector('html');
    this.store.dispatch(toggle({ darkMode: event }));
  }

  openNavBar(): void {
    this.isNavBarOpened = !this.isNavBarOpened;
    this.navBarOutputSignal.emit(this.isNavBarOpened);
  }
  logout() {
    this.userService.logout();
  }

  navigateToHome() {
    this.router.navigate(['user', 'home']);
  }

  navigateCreate() {
    this.router.navigate(['create'], { relativeTo: this.activatedRoute });
  }
  navigateProfile() {
    this.router.navigate(['profile', this.userService.userID], {
      relativeTo: this.activatedRoute,
    });
  }
}
