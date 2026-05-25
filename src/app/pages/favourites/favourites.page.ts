import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class FavouritesPage {

  favourites: any[] = [];

  constructor(private router: Router) {}

  ionViewWillEnter() {
    this.loadFavourites();
  }

  loadFavourites() {
    this.favourites =
      JSON.parse(localStorage.getItem('favourites') || '[]');
  }

  getPosterUrl(path: string) {
    return `https://image.tmdb.org/t/p/w300${path}`;
  }

  openMovie(movie: any) {
    this.router.navigate(['/movie-details'], {
      state: { movie: movie }
    });
  }
}