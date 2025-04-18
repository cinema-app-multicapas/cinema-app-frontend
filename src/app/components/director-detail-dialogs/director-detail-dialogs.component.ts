import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Director } from '../../models/Director';
import { Movie } from '../../models/Movie'; 
import { DirectorService } from '../../services/director.service';
import { MovieService } from '../../services/movie.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { NewMovieComponent } from '../new-movie/new-movie.component';

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
    MatSnackBarModule,
    HttpClientModule
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
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private directorService: DirectorService,
    private movieService: MovieService
  ) {
    // Inicializar el formulario de película con valores por defecto
    this.movieForm = this.fb.group({
      id: [null],
      title: ['', Validators.required],
      releaseYear: [null, [Validators.required, Validators.min(1900), Validators.max(2100)]],
      genre: ['', Validators.required],
      duration: [null, [Validators.required, Validators.min(1)]],
      synopsis: ['', Validators.required],
      posterUrl: [''],
      directorId: [null]
    });
    
    // Inicializar el formulario de director con valores por defecto
    this.directorForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      nationality: ['', Validators.required],
      birthDate: [null, Validators.required],
      biography: ['', Validators.required],
      photoUrl: ['']
    });
  }
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.loadDirectorById(Number(id));
      } else {
        this.goBack();
      }
    });
  }
  
  loadDirectorById(id: number): void {
    this.directorService.getDirector(id).subscribe({
      next: (director) => {
        this.director = director;
        this.loadMoviesForDirector();
      },
      error: (error) => {
        console.error('Error al cargar director:', error);
        this.snackBar.open('Error al cargar datos del director', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'top'
        });
        this.goBack();
      }
    });
  }
  
  loadMoviesForDirector(): void {
    if (this.director && this.director.id) {
      this.movieService.getMoviesByDirector(this.director.id).subscribe({
        next: (movies) => {
          this.directorMovies = movies;
        },
        error: (error) => {
          console.error('Error al cargar películas:', error);
          this.snackBar.open('Error al cargar películas del director', 'Cerrar', {
            duration: 3000,
            verticalPosition: 'top'
          });
        }
      });
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
      releaseYear: movie.releaseYear,
      genre: movie.genre,
      duration: movie.duration,
      synopsis: movie.synopsis,
      posterUrl: movie.posterUrl,
      directorId: movie.directorId
    });
  }
  
  cancelEdit(): void {
    this.isEditingMovie = false;
    this.editingMovieId = null;
    this.movieForm.reset();
  }
  
  saveMovie(): void {
    if (this.movieForm.valid && this.editingMovieId) {
      const updatedMovie: Movie = this.movieForm.value;
      
      this.movieService.updateMovie(this.editingMovieId, updatedMovie).subscribe({
        next: () => {
          this.loadMoviesForDirector(); // Recargar la lista
          
          // Mostrar confirmación
          this.snackBar.open('Película actualizada correctamente', 'Cerrar', {
            duration: 3000,
            verticalPosition: 'top'
          });
          
          // Salir del modo de edición
          this.cancelEdit();
        },
        error: (error) => {
          console.error('Error al actualizar película:', error);
          this.snackBar.open('Error al actualizar película', 'Cerrar', {
            duration: 3000,
            verticalPosition: 'top'
          });
        }
      });
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
        birthDate: this.director.birthDate,
        biography: this.director.biography,
        photoUrl: this.director.photoUrl
      });
    }
  }
  
  cancelDirectorEdit(): void {
    this.isEditingDirector = false;
    this.directorForm.reset();
  }
  
  saveDirector(): void {
    if (this.directorForm.valid && this.director && this.director.id) {
      const updatedDirector: Director = this.directorForm.value;
      
      this.directorService.updateDirector(this.director.id, updatedDirector).subscribe({
        next: (director) => {
          this.director = director; // Actualizar el director actual
          
          // Mostrar confirmación
          this.snackBar.open('Director actualizado correctamente', 'Cerrar', {
            duration: 3000,
            verticalPosition: 'top'
          });
          
          // Salir del modo de edición
          this.cancelDirectorEdit();
        },
        error: (error) => {
          console.error('Error al actualizar director:', error);
          this.snackBar.open('Error al actualizar director', 'Cerrar', {
            duration: 3000,
            verticalPosition: 'top'
          });
        }
      });
    }
  }
  
  deleteMovie(movie: Movie): void {
    // Confirm delete
    if (confirm(`¿Estás seguro que deseas eliminar la película "${movie.title}"?`)) {
      this.movieService.deleteMovie(movie.id!).subscribe({
        next: () => {
          // Refresh the director's movies
          this.loadMoviesForDirector();
          
          // Show confirmation message
          this.snackBar.open('Película eliminada correctamente', 'Cerrar', {
            duration: 3000,
            verticalPosition: 'top'
          });
        },
        error: (error) => {
          console.error('Error al eliminar película:', error);
          this.snackBar.open('Error al eliminar película', 'Cerrar', {
            duration: 3000,
            verticalPosition: 'top'
          });
        }
      });
    }
  }
  
  goBack(): void {
    this.location.back();
  }

  openNewMovieDialog(): void {
    const dialogRef = this.dialog.open(NewMovieComponent, {
      width: '500px',
      disableClose: true,
      data: {
        directorId: this.director?.id
      }
    });
      
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Añadir el nuevo director a la lista
        this.directorMovies.push(result);
          
        // Mostrar mensaje de confirmación
        this.snackBar.open(`Director ${result.name} añadido correctamente`, 'Cerrar', {
          duration: 3000,
          verticalPosition: 'top'
        });        
      }
    });
  }

}