import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'movie-details/:id',
    loadComponent: () =>
      import('./pages/movie-details/movie-details.page').then(
        (m) => m.MovieDetailsPage
      ),
  },
  {
    path: 'person-details/:id',
    loadComponent: () =>
      import('./pages/person-details/person-details.page').then(
        (m) => m.PersonDetailsPage
      ),
  },
  {
    path: 'favourites',
    loadComponent: () =>
      import('./pages/favourites/favourites.page').then(
        (m) => m.FavouritesPage
      ),
  },
];