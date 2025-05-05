import { Component } from '@angular/core';
import {EditorModule} from 'primeng/editor'
@Component({
  selector: 'app-create-post',
  imports: [EditorModule , ],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css',
})
export class CreatePostComponent {}
