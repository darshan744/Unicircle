import { Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { MainComponent } from './Pages/main/main.component';
import { ProfileComponent } from './Pages/profile/profile.component';
import { SettingsComponent } from './Pages/settings/settings.component';
import { HomeComponent } from './Pages/home/home.component';
import { CreatePostComponent } from './Pages/create-post/create-post.component';

export const routes: Routes = [
  {
    path:"",
    component:LoginComponent
  },
  {
    path:"user/:id",
    component:MainComponent,
    children:[
      {
        path:"home",
        component:HomeComponent
      },
      {
        path:"profile",
        component:ProfileComponent
      },
      {
        path:"settings",
        component:SettingsComponent
      },
      {
        path:"create",
        component:CreatePostComponent
      }
    ]
  }
];
