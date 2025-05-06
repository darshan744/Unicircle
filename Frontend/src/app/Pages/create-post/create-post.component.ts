import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { EditorComponent } from '../../Components/editor/editor.component';
import { TabsModule } from 'primeng/tabs';
import { CreateGroupComponent } from "../../Components/create-group/create-group.component";
@Component({
  selector: 'app-create-post',
  imports: [EditorComponent, TabsModule, CreateGroupComponent],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css',
})
export class CreatePostComponent {

}
