import { Component, input, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Avatar } from 'primeng/avatar';
import { Button } from 'primeng/button';
import { Drawer } from 'primeng/drawer';
import { UserGroup } from '../../Types/User';
@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, Avatar, Drawer],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  // input from home component
  @Input() userGroups: Observable<Array<UserGroup>> | undefined;
  isNavbarOpened = input<boolean>(true)

  get navBarOpened() : boolean {
    return this.isNavbarOpened();
  }
  // to view current selected group
  selectedGroup: UserGroup | null = null;
}
