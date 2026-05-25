import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.page.html',
  styleUrls: ['./person-details.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    HttpClientModule
  ]
})
export class PersonDetailsPage implements OnInit {

  person: any;
  personDetails: any;

  apiKey = 'aec8cb7579247fdf0ce50a43711f7308';

  constructor(private http: HttpClient) {
    const nav = history.state;
    this.person = nav.person;
  }

  ngOnInit() {
    if (this.person) {
      this.loadPersonDetails();
    }
  }

  loadPersonDetails() {
    const url =
      `https://api.themoviedb.org/3/person/${this.person.id}?api_key=${this.apiKey}`;

    this.http.get<any>(url).subscribe(response => {
      this.personDetails = response;
    });
  }

  getProfileUrl(path: string) {
    if (!path) {
      return '';
    }

    return `https://image.tmdb.org/t/p/w300${path}`;
  }
}
