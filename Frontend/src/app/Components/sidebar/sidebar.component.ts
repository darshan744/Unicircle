import { Component, inject, input, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Avatar } from 'primeng/avatar';
import { Drawer } from 'primeng/drawer';
import { UserGroup } from '../../Types/User';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, Avatar, Drawer, RouterLinkActive, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  // input from home component
  @Input() userGroups: Observable<Array<UserGroup>> | undefined;
  // for toggling navbar from toolbar component
  isNavbarOpened = input<boolean>(true);
  // navigation
  private readonly router = inject(Router);
  //getter for toggle or not
  get navBarOpened(): boolean {
    return this.isNavbarOpened();
  }
  // to view current selected group
  selectedGroup: UserGroup | null = null;
  // navigation
  navigateToHome() {
    this.router.navigate(['user', 'home']);
  }
}
