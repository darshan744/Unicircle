import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ToastModule} from 'primeng/toast'
import { ToastComponent } from "./Components/toast/toast.component";
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastModule, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'unicircle';
  ngOnInit(): void {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    document.documentElement.classList.toggle(
      'dark',
      localStorage['theme'] === 'dark' ||
        (!('theme' in localStorage) &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)
    );
    localStorage.setItem(
      'theme',
      window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light"
    );
  }
}
