import { Component, Input } from '@angular/core';
import { UserGroup } from '../../Types/User';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Avatar } from 'primeng/avatar';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule , Avatar],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  // input from home component 
  @Input() userGroups : Observable<Array<UserGroup>> | undefined
  // to view current selected group
  selectedGroup : UserGroup | null = null;
}
