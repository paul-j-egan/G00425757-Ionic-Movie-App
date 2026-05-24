import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';

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

  apiKey = 'aec8cb7579247fdf0ce50a43711f7308';

  constructor(private http: HttpClient) {
    const nav = history.state;
    this.movie = nav.movie;
  }

  ngOnInit() {
    if (this.movie) {
      this.loadCredits();
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
}