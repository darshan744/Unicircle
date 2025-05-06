import { Component, signal, WritableSignal } from '@angular/core';
import { Button } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { MessageModule } from 'primeng/message';
import { UserService } from '../../Service/User/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {FileUpload, FileUploadEvent, FileUploadHandlerEvent} from 'primeng/fileupload'
import { ToastService } from '../../Service/ToastService/toast.service';
@Component({
  selector: 'app-create-group',
  imports: [
    FloatLabel,
    TextareaModule,
    InputText,
    Button,
    MessageModule,
    CommonModule,
    FormsModule,
    FileUpload,
  ],
  templateUrl: './create-group.component.html',
  styleUrl: './create-group.component.css',
})
export class CreateGroupComponent {
  constructor(private service: UserService , private toastService : ToastService) {}
  // group Name
  groupText = signal<string>('');
  // whether to show message tag
  messageShow: WritableSignal<boolean> = signal(false);
  // for severity in html also for state for Group name availability
  messageAvailable: WritableSignal<boolean> = signal(false);
  // message for html rendering
  message: WritableSignal<string | null> = signal(null);
  // image for profile of the group
  imageFile : WritableSignal<File | null> = signal(null);
  // get the group name check for availability
  checkGroupName() {
    const value = this.groupText().trimStart().trimEnd();
    if (value !== '' && value !== null) {
      this.service.checkGroupName(this.groupText()).subscribe((res) => {
        this.message.set(res.message);
        this.messageShow.set(true);
        this.messageAvailable.set(res.data.available);
      });
    }
  }
  // GroupImage file handler;
  groupImageHandler(event: FileUploadHandlerEvent) {
    const imageFile = event.files[0];
    this.imageFile.set(imageFile);
  }
  handleGroupCreation() {
    if (
      this.groupText() === '' ||
      this.groupText() === null ||
      this.groupText() === undefined
    ) {
      this.toastService.showToast(
        'Empty',
        'Please Enter a Group Name',
        'error'
      );
      return;
    }
    if (!this.messageAvailable()){
      this.toastService.showToast(
        "Not Available",
        "The username is not available",
        "error"
      )
      return;
    }
      this.service.createGroup(this.groupText(), this.imageFile()); 
  }
}
