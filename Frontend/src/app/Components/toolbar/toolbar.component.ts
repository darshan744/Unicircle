import { Component, signal, WritableSignal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

import {ToolbarModule} from 'primeng/toolbar'
import {AvatarModule} from 'primeng/avatar'
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import {IconFieldModule} from 'primeng/iconfield'
import {InputTextModule} from 'primeng/inputtext'
import {InputIconModule} from 'primeng/inputicon'
import { ToggleSwitchModule } from "primeng/toggleswitch";
import { MenuModule } from "primeng/menu";
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
    RouterLink
  ],
  templateUrl: './toolbar.component.html',
})
export class ToolbarComponent {
  toggleSignal: WritableSignal<boolean> = signal(false);
  items: MenuItem[] = [
    {
      icon: 'pi pi-home',
      label: 'Home',
    },
  ];
  toggleTheme() {
    this.toggleSignal.set(!this.toggleSignal());
    const html = document.querySelector('html');
    this.toggleSignal()
      ? html?.classList.add('dark')
      : html?.classList.remove('dark');
  }
}
