import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class HomePage {
  searchTerm: string = '';

  movies = [
    {
      title: 'The Dark Knight',
      year: 2008,
      image: 'https://via.placeholder.com/100x150'
    },
    {
      title: 'Inception',
      year: 2010,
      image: 'https://via.placeholder.com/100x150'
    },
    {
      title: 'Interstellar',
      year: 2014,
      image: 'https://via.placeholder.com/100x150'
    }
  ];

  searchMovies() {
    alert('Searching for: ' + this.searchTerm);
  }
}