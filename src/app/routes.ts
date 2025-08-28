import { Routes } from '@angular/router';
import { CounterComponent } from './counter/counter';
import { SettingsComponent } from './settings/settings.component';

export const routes: Routes = [
  {
    path: '',
    component: CounterComponent,
    title: 'Pradakshina Counter'
  },
  {
    path: 'settings',
    component: SettingsComponent,
    title: 'Settings - Pradakshina Counter'
  },
  {
    path: '**',
    redirectTo: ''
  }
]; 