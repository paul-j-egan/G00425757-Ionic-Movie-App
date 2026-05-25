import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonicModule,
  LoadingController
} from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    HttpClientModule
  ]
})
export class HomePage {
  studentNumber = 'G00425757';
  searchTerm = '';
  movies: any[] = [];
  favouriteCount = 0;
  noResults = false;
  sortOption = '';

  apiKey = 'aec8cb7579247fdf0ce50a43711f7308';

  constructor(
    private http: HttpClient,
    private router: Router,
    private loadingController: LoadingController
  ) {
    this.loadTrendingMovies();
    this.updateFavouriteCount();
  }

  async loadTrendingMovies() {
    const loading = await this.loadingController.create({
      message: 'Loading movies...'
    });

    await loading.present();

    const url =
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${this.apiKey}`;

    this.http.get<any>(url).subscribe(response => {
      this.movies = response.results;
      this.noResults = false;
      loading.dismiss();
    });
  }

  async searchMovies() {
    if (!this.searchTerm.trim()) {
      this.loadTrendingMovies();
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Searching movies...'
    });

    await loading.present();

    const url =
      `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${this.searchTerm}`;

    this.http.get<any>(url).subscribe(response => {
      this.movies = response.results;
      this.noResults = this.movies.length === 0;
      loading.dismiss();
    });
  }

  sortMovies() {
    if (this.sortOption === 'title') {
      this.movies.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    }

    if (this.sortOption === 'popularity') {
      this.movies.sort((a, b) =>
        b.popularity - a.popularity
      );
    }

    if (this.sortOption === 'release') {
      this.movies.sort((a, b) =>
        new Date(b.release_date).getTime() -
        new Date(a.release_date).getTime()
      );
    }
  }

  getPosterUrl(path: string) {
    return `https://image.tmdb.org/t/p/w500${path}`;
  }

  openMovie(movie: any) {
    this.router.navigate(['/movie-details'], {
      state: { movie: movie }
    });
  }

  openFavourites() {
    this.router.navigate(['/favourites']);
  }

  updateFavouriteCount() {
    const favourites =
      JSON.parse(localStorage.getItem('favourites') || '[]');

    this.favouriteCount = favourites.length;
  }

  ionViewWillEnter() {
    this.updateFavouriteCount();
  }
}