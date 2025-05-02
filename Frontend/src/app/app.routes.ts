import { Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { MainComponent } from './Pages/main/main.component';
import { ProfileComponent } from './Pages/profile/profile.component';
import { SettingsComponent } from './Pages/settings/settings.component';

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
        path:"profile",
        component:ProfileComponent
      },
      {
        path:"settings",
        component:SettingsComponent
      }
    ]
  }
];
