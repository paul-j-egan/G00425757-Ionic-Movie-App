import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    HttpClientModule
  ]
})
export class MovieDetailsPage implements OnInit {

  movie: any;
  cast: any[] = [];
  crew: any[] = [];
  isFavourite = false;

  apiKey = 'aec8cb7579247fdf0ce50a43711f7308';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    const nav = history.state;
    this.movie = nav.movie;
  }

  ngOnInit() {
    if (this.movie) {
      this.loadCredits();
      this.checkFavourite();
    }
  }

  loadCredits() {
    const url =
      `https://api.themoviedb.org/3/movie/${this.movie.id}/credits?api_key=${this.apiKey}`;

    this.http.get<any>(url).subscribe(response => {
      this.cast = response.cast;
      this.crew = response.crew;
    });
  }

  getProfileUrl(path: string) {
    if (!path) {
      return '';
    }

    return `https://image.tmdb.org/t/p/w200${path}`;
  }

  checkFavourite() {
    const favourites =
      JSON.parse(localStorage.getItem('favourites') || '[]');

    this.isFavourite =
      favourites.some((fav: any) => fav.id === this.movie.id);
  }

  toggleFavourite() {
    let favourites =
      JSON.parse(localStorage.getItem('favourites') || '[]');

    if (this.isFavourite) {
      favourites = favourites.filter((fav: any) => fav.id !== this.movie.id);
    } else {
      favourites.push(this.movie);
    }

    localStorage.setItem('favourites', JSON.stringify(favourites));
    this.checkFavourite();
  }

  openPerson(person: any) {
    this.router.navigate(['/person-details', person.id], {
      state: { person: person }
    });
  }
}