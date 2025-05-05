import { Component } from '@angular/core';
import {Tab, TabList, Tabs} from 'primeng/tabs'
import {Avatar} from 'primeng/avatar'
import { LoginUser } from '../../Types/Auth';
import { FileUploadHandlerEvent, FileUploadModule } from 'primeng/fileupload';
import {PopoverModule} from 'primeng/popover'
import { UserService } from '../../Service/User/user.service';
import { ButtonModule } from 'primeng/button';
import {TooltipModule} from 'primeng/tooltip'
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
  ],
  // styles: '.p-tablist-tab-list {gap:10rem !important;}',
  styleUrl: './profile.component.css',
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  user: LoginUser = JSON.parse(localStorage.getItem('user') || '{}');

  constructor(private service: UserService) {}

  clearProfile() {
    this.service.deleteProfileImage()
  }

  updateProfile(event: FileUploadHandlerEvent) {
    const file: File = event.files[0];
    this.service.uploadProfileImage(file);
  }
}
