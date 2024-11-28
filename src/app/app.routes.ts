import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'crear',
    loadComponent: () => import('./crear/crear.page').then((m) => m.CrearPage),
  },
  {
    path: 'detalles/:id',
    loadComponent: () =>
      import('./detalles/detalles.page').then((m) => m.DetallesPage),
  },
  {
    path: 'favoritos',
    loadComponent: () =>
      import('./favoritos/favoritos.page').then((m) => m.FavoritosPage),
  },
];
