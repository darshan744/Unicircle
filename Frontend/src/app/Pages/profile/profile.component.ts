import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { Tab, TabList, TabPanel, TabPanels, Tabs } from 'primeng/tabs';
import { Avatar } from 'primeng/avatar';
import { FileUploadHandlerEvent, FileUploadModule } from 'primeng/fileupload';
import { PopoverModule } from 'primeng/popover';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

import { UserGroupListComponent } from '../../Components/user-group-list/user-group-list.component';
import { UserPostsComponent } from '../../Components/user-posts/user-posts.component';
import { UserCommnetsComponent } from '../../Components/user-commnets/user-commnets.component';

import { UserService } from '../../Service/User/user.service';
import { LoginUser } from '../../Types/Auth';
@Component({
  selector: 'app-profile',
  imports: [
    Avatar,
    Tabs,
    TabList,
    Tab,
    PopoverModule,
    FileUploadModule,
    ButtonModule,
    TooltipModule,
    UserGroupListComponent,
    TabPanels,
    TabPanel,
    UserPostsComponent,
    UserCommnetsComponent,
  ],
  styleUrl: './profile.component.css',
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  user: LoginUser = JSON.parse(localStorage.getItem('user') || '{}');

  constructor(private service: UserService,) {}
  ngOnInit() {
  }
  clearProfile() {
    this.service.deleteProfileImage();
  }

  updateProfile(event: FileUploadHandlerEvent) {
    const file: File = event.files[0];
    this.service.uploadProfileImage(file);
  }
}
