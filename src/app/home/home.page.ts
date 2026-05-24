import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonIcon,
  IonButtons
} from '@ionic/angular/standalone';

import { heart } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonInput,
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonIcon,
    IonButtons
  ]
})
export class HomePage implements OnInit {

  searchTerm = '';
  movies: any[] = [];
  heading = "Today's Trending Movies";

  apiKey = 'aec8cb7579247fdf0ce50a43711f7308';
  imageBaseUrl = 'https://image.tmdb.org/t/p/w300';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    addIcons({ heart });
  }

  ngOnInit() {
    this.loadTrendingMovies();
  }

  loadTrendingMovies() {
    const url =
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${this.apiKey}`;

    this.http.get<any>(url).subscribe(response => {
      this.movies = response.results;
      this.heading = "Today's Trending Movies";
    });
  }

  searchMovies() {
    const term = this.searchTerm.trim();

    if (term === '') {
      this.loadTrendingMovies();
      return;
    }

    const url =
      `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${encodeURIComponent(term)}`;

    this.http.get<any>(url).subscribe(response => {
      this.movies = response.results;
      this.heading = `${term} Movies`;
    });
  }

  getPoster(path: string) {
    if (!path) {
      return '';
    }

    return this.imageBaseUrl + path;
  }

  openMovie(movie: any) {
    console.log(movie);
  }

  openFavourites() {
    alert('Favourites page coming next');
  }
}