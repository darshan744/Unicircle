import { Component, model, OnInit, signal, WritableSignal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {ToolbarModule} from 'primeng/toolbar'
import {AvatarModule} from 'primeng/avatar'
import { ButtonModule } from 'primeng/button';
import {IconFieldModule} from 'primeng/iconfield'
import {InputTextModule} from 'primeng/inputtext'
import {InputIconModule} from 'primeng/inputicon'
import { ToggleSwitchModule } from "primeng/toggleswitch";
import { MenuModule } from "primeng/menu";
import { UserService } from '../../Service/User/user.service';
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
  constructor(private userService: UserService, private router: Router) {}
  themeSignal = model(false);
  ngOnInit(): void {
    if (localStorage['theme'] === 'dark') {
      this.themeSignal.set(true);
    } else {
      this.themeSignal.set(false);
    }
  }
  toggleTheme() {
    const html = document.querySelector('html');
    html?.classList.toggle('dark');
    localStorage.setItem('theme', this.themeSignal() ? 'dark' : 'light');
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
