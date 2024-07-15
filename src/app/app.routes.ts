import { Routes } from '@angular/router';
import { ROUTE } from 'tt-library-angular-porfolio';

export const routes: Routes = [
  {
    path: ROUTE.WINFIT_ONLINE,
    loadComponent: () => import('./_components/winfit-online/winfit-online.component').then(c => c.WinfitOnlineComponent),
  }
];
