import { Routes } from '@angular/router';
import {SignInComponent} from "../pages/sign-in/sign-in.component";
import {UsersComponent} from "../pages/users/users.component";

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: SignInComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
