import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Director } from '../../models/Director';
import { Movie } from '../../models/Movie'; 
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-director-detail-dialogs',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ],
  templateUrl: './director-detail-dialogs.component.html',
  styleUrl: './director-detail-dialogs.component.css'
})
export class DirectorDetailDialogsComponent implements OnInit {
  director?: Director;
  directorMovies: Movie[] = [];
  
  // Variables para la edición de películas
  isEditingMovie: boolean = false;
  editingMovieId: number | null = null;
  movieForm: FormGroup;
  
  // Variables para la edición del director
  isEditingDirector: boolean = false;
  directorForm: FormGroup;
  
  private directorsData: Director[] = [
    {
      id: 1,
      name: 'Christopher Nolan',
      birth_date: new Date('1970-07-30'),
      nationality: 'Británico',
      biography: 'Christopher Nolan es un director y guionista británico-estadounidense conocido por sus narrativas no lineales y sus películas de ciencia ficción. Ha dirigido éxitos de taquilla como "Inception", "Interstellar" y la trilogía de Batman que comenzó con "Batman Begins". Su estilo cinematográfico se caracteriza por estructuras narrativas complejas y efectos prácticos en lugar de CGI.',
      photo_url: 'https://es.web.img3.acsta.net/pictures/14/10/30/10/59/215487.jpg'
    },
    {
      id: 2,
      name: 'Greta Gerwig',
      birth_date: new Date('1983-08-04'),
      nationality: 'Estadounidense',
      biography: 'Greta Gerwig es una directora, guionista y actriz estadounidense. Comenzó su carrera en el cine independiente y se ha convertido en una de las directoras más aclamadas de su generación. Ha dirigido películas como "Lady Bird", "Little Women" y "Barbie", recibiendo múltiples nominaciones a los premios Oscar por su trabajo como directora y guionista.',
      photo_url: 'https://i.guim.co.uk/img/media/0abe4d18f6b8f692ab092ba1b26b165b860db247/0_0_5000_3000/master/5000.jpg?width=1020&dpr=1&s=none'
    },
    {
      id: 3,
      name: 'Bong Joon-ho',
      birth_date: new Date('1969-09-14'),
      nationality: 'Surcoreano',
      biography: 'Bong Joon-ho es un director y guionista surcoreano, conocido por mezclar géneros y abordar temas sociales en sus películas. Alcanzó reconocimiento internacional con "Parasite", que se convirtió en la primera película no inglesa en ganar el Oscar a Mejor Película. Entre sus obras también destacan "Snowpiercer", "Okja" y "Memories of Murder".',
      photo_url: 'https://images.mubicdn.net/images/cast_member/4836/cache-617588-1607417988/image-w856.jpg'
    }
  ];
  
  private allMovies: Movie[] = [
    {
      id: 1,
      title: 'Inception',
      release_year: 2010,
      genre: 'Ciencia ficción',
      duration: 148,
      synopsis: 'Un ladrón que roba secretos del subconsciente durante el estado de sueño es contratado para realizar la tarea inversa: implantar una idea en la mente de un CEO.',
      director_id: 1,
      poster_url: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg'
    },
    {
      id: 2,
      title: 'Interstellar',
      release_year: 2014,
      genre: 'Drama',
      duration: 169,
      synopsis: 'Exploradores viajan más allá de nuestra galaxia para descubrir si la humanidad tiene un futuro entre las estrellas.',
      director_id: 1,
      poster_url: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg'
    },
    {
      id: 3,
      title: 'The Dark Knight',
      release_year: 2008,
      genre: 'Acción',
      duration: 152,
      synopsis: 'Batman se enfrenta al Joker en una lucha por Gotham que pone a prueba los límites del héroe y lo lleva a enfrentar dilemas morales.',
      director_id: 1,
      poster_url: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg'
    },
    {
      id: 4,
      title: 'Lady Bird',
      release_year: 2017,
      genre: 'Drama',
      duration: 94,
      synopsis: 'Una adolescente se enfrenta a su último año escolar mientras navega relaciones complicadas con su madre y amigos.',
      director_id: 2,
      poster_url: 'https://m.media-amazon.com/images/M/MV5BODhkZGE0NDQtZDc0Zi00YmQ4LWJiNmUtYTY1OGM1ODRmNGVkXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg'
    },
    {
      id: 5,
      title: 'Parasite',
      release_year: 2019,
      genre: 'Drama',
      duration: 132,
      synopsis: 'Una familia coreana de bajos recursos se infiltra en la vida de una adinerada familia, con consecuencias inesperadas para ambas.',
      director_id: 3,
      poster_url: 'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg'
    }
  ];
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    // Inicializar el formulario de película con valores por defecto
    this.movieForm = this.fb.group({
      id: [null],
      title: ['', Validators.required],
      release_year: [null, [Validators.required, Validators.min(1900), Validators.max(2100)]],
      genre: ['', Validators.required],
      duration: [null, [Validators.required, Validators.min(1)]],
      synopsis: ['', Validators.required],
      poster_url: [''],
      director_id: [null]
    });
    
    // Inicializar el formulario de director con valores por defecto
    this.directorForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      nationality: ['', Validators.required],
      birth_date: [null, Validators.required],
      biography: ['', Validators.required],
      photo_url: ['']
    });
    
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      const state = navigation.extras.state as { director: Director };
      if (state.director) {
        this.director = state.director;
        this.loadMoviesForDirector();
      }
    }
  }
  
  ngOnInit(): void {
    if (!this.director) {
      this.route.params.subscribe(params => {
        const id = params['id'];
        if (id) {
          this.loadDirectorById(Number(id));
        } else {
          this.goBack();
        }
      });
    }
  }
  
  loadDirectorById(id: number): void {
    this.director = this.directorsData.find(d => d.id === id);
    
    if (this.director) {
      this.loadMoviesForDirector();
    } else {
      this.goBack();
    }
  }
  
  loadMoviesForDirector(): void {
    if (this.director) {
      this.directorMovies = this.allMovies.filter(m => m.director_id === this.director?.id);
    }
  }
  
  // Métodos para la edición de películas
  editMovie(movie: Movie): void {
    // Si estamos editando el director, cancelamos esa edición primero
    if (this.isEditingDirector) {
      this.cancelDirectorEdit();
    }
    
    this.isEditingMovie = true;
    this.editingMovieId = movie.id || null;
    
    // Cargar los datos de la película en el formulario
    this.movieForm.patchValue({
      id: movie.id,
      title: movie.title,
      release_year: movie.release_year,
      genre: movie.genre,
      duration: movie.duration,
      synopsis: movie.synopsis,
      poster_url: movie.poster_url,
      director_id: movie.director_id
    });
  }
  
  cancelEdit(): void {
    this.isEditingMovie = false;
    this.editingMovieId = null;
    this.movieForm.reset();
  }
  
  saveMovie(): void {
    if (this.movieForm.valid) {
      const updatedMovie: Movie = this.movieForm.value;
      
      // Encontrar y actualizar la película en la lista
      const index = this.allMovies.findIndex(m => m.id === updatedMovie.id);
      
      if (index !== -1) {
        this.allMovies[index] = updatedMovie;
        this.loadMoviesForDirector(); // Recargar la lista
        
        // Mostrar confirmación
        this.snackBar.open('Película actualizada correctamente', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'top'
        });
        
        // Salir del modo de edición
        this.cancelEdit();
      }
    }
  }
  
  // Métodos para la edición de director
  editDirector(): void {
    // Si estamos editando una película, cancelamos esa edición primero
    if (this.isEditingMovie) {
      this.cancelEdit();
    }
    
    this.isEditingDirector = true;
    
    // Cargar los datos del director en el formulario
    if (this.director) {
      this.directorForm.patchValue({
        id: this.director.id,
        name: this.director.name,
        nationality: this.director.nationality,
        birth_date: this.director.birth_date,
        biography: this.director.biography,
        photo_url: this.director.photo_url
      });
    }
  }
  
  cancelDirectorEdit(): void {
    this.isEditingDirector = false;
    this.directorForm.reset();
  }
  
  saveDirector(): void {
    if (this.directorForm.valid) {
      const updatedDirector: Director = this.directorForm.value;
      
      // Encontrar y actualizar el director en la lista
      const index = this.directorsData.findIndex(d => d.id === updatedDirector.id);
      
      if (index !== -1) {
        this.directorsData[index] = updatedDirector;
        this.director = updatedDirector; // Actualizar el director actual
        
        // Mostrar confirmación
        this.snackBar.open('Director actualizado correctamente', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'top'
        });
        
        // Salir del modo de edición
        this.cancelDirectorEdit();
      }
    }
  }

  deleteMovie(movie: Movie): void {
    // Confirm delete
    if (confirm(`¿Estás seguro que deseas eliminar la película "${movie.title}"?`)) {
      // Find movie index in the allMovies array
      const index = this.allMovies.findIndex(m => m.id === movie.id);
      
      if (index !== -1) {
        // Remove the movie from the array
        this.allMovies.splice(index, 1);
        
        // Refresh the director's movies
        this.loadMoviesForDirector();
        
        // Show confirmation message
        this.snackBar.open('Película eliminada correctamente', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'top'
        });
      }
    }
  }
  
  goBack(): void {
    this.location.back();
  }
}