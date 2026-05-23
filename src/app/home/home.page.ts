import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  IonCardSubtitle
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonInput,
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle
  ]
})
export class HomePage {

  searchTerm: string = '';

  allMovies = [
    {
      title: 'The Dark Knight',
      year: 2008,
      image: 'https://picsum.photos/200/300?1'
    },
    {
      title: 'Inception',
      year: 2010,
      image: 'https://picsum.photos/200/300?2'
    },
    {
      title: 'Interstellar',
      year: 2014,
      image: 'https://picsum.photos/200/300?3'
    }
  ];

  movies = [...this.allMovies];

  searchMovies() {
    const term = this.searchTerm.toLowerCase().trim();

    if (term === '') {
      this.movies = [...this.allMovies];
      return;
    }

    this.movies = this.allMovies.filter(movie =>
      movie.title.toLowerCase().includes(term)
    );
  }
}