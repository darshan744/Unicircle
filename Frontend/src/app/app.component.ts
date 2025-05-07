import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { ToastComponent } from './Components/toast/toast.component';
import { Store } from '@ngrx/store';
import { toggle } from './Store/Theme/Theme.actions';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastModule, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'unicircle';
  constructor(private store : Store) {}
  ngOnInit(): void {
    // check preferred theme in prefers-color-scheme media query
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    // check if user has set a theme in local storage
    const storedTheme = localStorage.getItem("theme");
    if(storedTheme) {
      const isDark = storedTheme === 'dark';
      this.store.dispatch(toggle({ darkMode: isDark }));
      const html = document.querySelector('html');
      html?.classList.toggle('dark', isDark);
    }
    else {
      this.store.dispatch(toggle({darkMode : prefersDarkScheme}));
      const html = document.querySelector('html');
      html?.classList.toggle('dark', prefersDarkScheme);
    }
  }
}
