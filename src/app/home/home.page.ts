import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
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

  apiKey = 'aec8cb7579247fdf0ce50a43711f7308';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.loadTrendingMovies();
  }

  loadTrendingMovies() {
    const url =
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${this.apiKey}`;

    this.http.get<any>(url).subscribe(response => {
      this.movies = response.results;
    });
  }

  searchMovies() {
    if (!this.searchTerm.trim()) {
      this.loadTrendingMovies();
      return;
    }

    const url =
      `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${this.searchTerm}`;

    this.http.get<any>(url).subscribe(response => {
      this.movies = response.results;
    });
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
}