import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ToastModule} from 'primeng/toast'
import { ToastComponent } from "./Components/toast/toast.component";
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastModule, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'unicircle';
}
