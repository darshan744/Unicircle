import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

import { QuillModule } from 'ngx-quill';

import { FileSelectEvent, FileUpload } from 'primeng/fileupload';
import { EditorModule } from 'primeng/editor';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { TabsModule } from 'primeng/tabs';
import { UserGroup } from '../../Types/User';
import { Store } from '@ngrx/store';
import StoreType from '../../Store/Store';
import {Select} from 'primeng/select'
@Component({
  selector: 'app-editor',
  imports: [
    EditorModule,
    FormsModule,
    QuillModule,
    ButtonModule,
    FileUpload,
    CommonModule,
    ChipModule,
    InputTextModule,
    FloatLabel,
    TabsModule,
    Select,
  ],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.css',
})
export class EditorComponent implements OnInit {
  constructor(private store: Store<StoreType>) {}
  //post tags
  tags: string[] = [];
  //post title
  postTitle: string = '';
  // post description
  tagText = signal('');
  // groups
  groups: Observable<UserGroup[]> = new Observable();
  // TODO
  text: string = '';
  files: File[] = [];

  ngOnInit(): void {
    this.groups = this.store.select('group');
  }

  addTags() {
    const value = this.tagText();
    const isEmpty = this.strIsEmpty(value);
    if (isEmpty && value !== undefined && value !== null) {
      this.tags.push(value);
    }
    this.tagText.set('');
  }
  tagRemove(index: number) {
    this.tags = this.tags.filter((_tag, idx) => {
      return idx !== index;
    });
  }
  strIsEmpty(str: string): boolean {
    for (let i = 0; i < str.length; i++) {
      if (str[i] !== ' ') {
        return true;
      }
    }
    return false;
  }
  logger(event: FileSelectEvent) {
    this.files = event.currentFiles;
  }
  loggin(el: any) {
    this.files.filter((e) => e !== el.file);
  }
  filelogg() {}

  enterTagHandler(e: KeyboardEvent) {
    const isEnter = e.key === 'Enter';
    let value = this.tagText();
    value = value.trimStart().trimEnd();
    const isEmpty = this.strIsEmpty(value);
    if (isEnter && isEmpty) {
      this.tags.push(this.tagText());
      this.tagText.set('');
    }
  }
}

class dummy {
  text = '';
  log() {
    if (!this.text) return;
    const parser = new DOMParser();
    const html = parser.parseFromString(this.text, 'text/html');
    const imageTags = html.querySelectorAll('img');
    if (imageTags) {
      this.parseImages(imageTags);
    }
  }
  choose(event: any, callback: any) {
    callback();
  }
  uploadEvent(callback: any) {
    callback();
  }
  parseImages(imageElements: NodeListOf<HTMLImageElement>) {
    for (const imageElement of imageElements) {
      const src = imageElement.getAttribute('src');
      const { mimeType, base64Data } = this.getSources(src ?? '');
      const unsigned8BitArray = this.getUnsignedBitArrays(base64Data);
      const fileBlob = new Blob([unsigned8BitArray], { type: mimeType });
      const file = new File([fileBlob], 'dummy.jpg', { type: mimeType });
      imageElement.setAttribute('src', file.name);
    }
  }
  private getSources(src: string) {
    const mimeType = src?.match(/:(.*?);/)?.[1];
    const base64Data = src?.split(',')[1];
    return { mimeType, base64Data };
  }
  private getUnsignedBitArrays(base64Data: string) {
    const byteCharacters = atob(base64Data ?? '');
    const byteArray = Array.from(byteCharacters, (chars) =>
      chars.charCodeAt(0)
    );
    const unsigned8BitArray = new Uint8Array(byteArray);
    return unsigned8BitArray;
  }
}
