import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Director } from '../../models/Director';
import { DirectorService } from '../../services/director.service';
import { NotificationService } from '../../services/notificacion.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// Angular Material imports
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatDialogModule,
    HttpClientModule
  ],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  directors: Director[] = [];
  loading = true;
  searchTerm = '';

  constructor(
    private notificationService: NotificationService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDirectors();
  }

  loadDirectors(): void {
    // 🔥 Datos quemados de ejemplo
    this.directors = [
      {
        id: 1,
        name: 'Christopher Nolan',
        birth_date: new Date('1970-07-30'),
        nationality: 'Británico',
        biography: 'Director de películas como Inception, Interstellar y The Dark Knight.',
        photo_url: 'https://es.web.img3.acsta.net/pictures/14/10/30/10/59/215487.jpg'
      },
      {
        id: 2,
        name: 'Greta Gerwig',
        birth_date: new Date('1983-08-04'),
        nationality: 'Estadounidense',
        biography: 'Directora de Lady Bird, Little Women y Barbie.',
        photo_url: 'https://i.guim.co.uk/img/media/0abe4d18f6b8f692ab092ba1b26b165b860db247/0_0_5000_3000/master/5000.jpg?width=1020&dpr=1&s=none&crop=none'
      },
      {
        id: 3,
        name: 'Bong Joon-ho',
        birth_date: new Date('1969-09-14'),
        nationality: 'Surcoreano',
        biography: 'Director de Parasite, Snowpiercer y The Host.',
        photo_url: 'https://images.mubicdn.net/images/cast_member/4836/cache-617588-1607417988/image-w856.jpg'
      }
    ];
    this.loading = false;
  }

  get filteredDirectors(): Director[] {
    const term = this.searchTerm.toLowerCase();
    return this.directors.filter(d =>
      d.name.toLowerCase().includes(term) ||
      d.nationality.toLowerCase().includes(term)
    );
  }
  
  openDirectorDialog(director?: Director): void {
    console.log('Abrir diálogo para:', director);
  }
  
  viewDirector(director: Director): void {
    console.log('Ver detalles de:', director);
  }
  
  deleteDirector(director: Director): void {
    console.log('Eliminar director:', director);
  }  
  
}
