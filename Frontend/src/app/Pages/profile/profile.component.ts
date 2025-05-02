import { Component } from '@angular/core';
import {Tab, TabList, Tabs} from 'primeng/tabs'
import {Avatar} from 'primeng/avatar'
@Component({
  selector: 'app-profile',
  imports: [Avatar, Tabs, TabList, Tab],
  // styles: '.p-tablist-tab-list {gap:10rem !important;}',
  styleUrl: './profile.component.css',
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  userNameEditable: boolean = true;
  nameEditable: boolean = true;
  passwordEditable: boolean = true;
}
