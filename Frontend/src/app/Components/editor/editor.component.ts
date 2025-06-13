import { Component, OnInit, signal } from '@angular/core';
import { FormsModule, } from '@angular/forms';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

import {
  FileRemoveEvent,
  FileSelectEvent,
  FileUpload,
} from 'primeng/fileupload';
import { EditorModule } from 'primeng/editor';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { TabsModule } from 'primeng/tabs';
import { UserGroup } from '../../Types/User';
import { Store } from '@ngrx/store';
import StoreType from '../../Store/Store';
import { Select } from 'primeng/select';
import { strIsEmpty } from '../../Utils/Util';
import { ToastService } from '../../Service/ToastService/toast.service';
import { PostService } from '../../Service/Post/post.service';
import { Avatar } from 'primeng/avatar';
@Component({
  selector: 'app-editor',
  imports: [
    EditorModule,
    FormsModule,
    ButtonModule,
    FileUpload,
    CommonModule,
    ChipModule,
    InputTextModule,
    FloatLabel,
    TabsModule,
    Select,
    Avatar,
  ],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.css',
})
export class EditorComponent implements OnInit {
  constructor(
    private store: Store<StoreType>,
    private toast: ToastService,
    private service: PostService
  ) { }
  //post tags
  tags: string[] = [];
  //post title
  postTitle = signal('');
  // post description
  tagText = signal('');
  // groups
  groups: Observable<UserGroup[]> = new Observable();
  //post description
  postDescription: string = '';
  // image files
  files: File[] = [];
  // selectedGroup;
  selectedGroup = signal<UserGroup>({} as UserGroup);
  ngOnInit(): void {
    this.groups = this.store.select('group');
  }
  /**
   * @param index number
   * @description To remove the tag based on index
   */
  tagRemove(index: number) {
    this.tags = this.tags.filter((_tag, idx) => idx !== index);
  }

  /**
   * @param event File Event
   * @description current files that is selected
   */
  uploadImage(event: FileSelectEvent) {
    this.files = event.currentFiles;
  }
  /**
   * @param el Event
   * @description remove the image
   */
  removeImage(el: FileRemoveEvent) {
    console.log(el);
    this.files.filter((e) => e !== el.file);
  }
  /**
   * @param e Event
   * @description If enter is pressed then the current value is checked (for Non Empty String)
   *  and then added to tag
   */
  enterTagHandler(e: KeyboardEvent) {
    const isEnter = e.key === 'Enter';
    let value = this.tagText();
    value = value.trimStart().trimEnd();
    const isEmpty = strIsEmpty(value);
    if (isEnter && isEmpty) {
      this.tags.push(this.tagText());
      this.tagText.set('');
    }
  }

  submit(): void {
    const selectedGroup = this.selectedGroup();
    const title = this.postTitle();
    const tags = this.tags;
    const description = this.postDescription;
    if (!selectedGroup) {
      return this.toast.showToast(
        'Empty Field ',
        'Please select a Group',
        'warn'
      );
    }
    if (!title || !strIsEmpty(title)) {
      return this.toast.showToast(
        'Empty Field ',
        'Please enter the title',
        'warn'
      );
    }
    if (!description || !strIsEmpty(description)) {
      return this.toast.showToast(
        'Empty Field ',
        'Please enter your description',
        'warn'
      );
    }
    const post = { group: selectedGroup.id, title, tags, description };
    this.service.createPost(post, this.files);
  }
}

