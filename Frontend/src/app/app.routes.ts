import { Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { MainComponent } from './Pages/main/main.component';
import { HomeComponent } from './Pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'user',
    component: MainComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'profile/:id',
        loadComponent: () =>
          import('./Pages/profile/profile.component').then(
            (comp) => comp.ProfileComponent
          ),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./Pages/settings/settings.component').then(
            (c) => c.SettingsComponent
          ),
      },
      {
        path: 'create',
        loadComponent: () =>
          import('./Pages/create-post/create-post.component').then(
            (c) => c.CreatePostComponent
          ),
      },
      {
        path: 'posts/:postId',
        loadComponent: () =>
          import('./Pages/post/post.component').then((c) => c.PostComponent),
      },
    ],
  },
];
