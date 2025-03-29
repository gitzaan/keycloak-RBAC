import { Routes } from '@angular/router';
import { ManagerComponent } from './manager.component';
import { AdminComponent } from './admin.component';
import { UserComponent } from './user.component';
import { UnauthorizedComponent } from './unauthorized.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
  { path: 'manager', component: ManagerComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'user', component: UserComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '', component: AppComponent },
  { path: '**', component: UnauthorizedComponent }
];