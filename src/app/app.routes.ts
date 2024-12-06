import {Routes} from '@angular/router';
import {ErrorComponent} from './modules/error/error.component';
import {NotFoundComponent} from './modules/not-found/not-found.component';
import {DashboardComponent} from './modules/dashboard/dashboard.component';
import {SettingsComponent} from './modules/settings/settings.component';

export const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'settings', component: SettingsComponent},
  {path: 'error', component: ErrorComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: '**', redirectTo: '/not-found'}
];
