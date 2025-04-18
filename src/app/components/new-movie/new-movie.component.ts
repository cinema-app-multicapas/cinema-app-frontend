import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Movie } from '../../models/Movie';
import { MovieService } from '../../services/movie.service';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-new-movie',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './new-movie.component.html',
  styleUrls: ['./new-movie.component.css']
})
export class NewMovieComponent {
  movieForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<NewMovieComponent>,
    private movieService: MovieService,
    @Inject(MAT_DIALOG_DATA) public data: { directorId: number }
  ) {
    this.movieForm = this.fb.group({
      title: ['', Validators.required],
      releaseYear: [new Date().getFullYear(), [Validators.required, Validators.min(1800)]],
      genre: ['', Validators.required],
      synopsis: ['', Validators.required],
      duration: [90, [Validators.required, Validators.min(1)]],
      posterUrl: [''],
      directorId: data.directorId
    });
  }

  onSubmit(): void {
    if (this.movieForm.valid) {
      const newMovie: Movie = this.movieForm.value;

      this.movieService.addMovie(newMovie).subscribe({
        next: (createdMovie) => this.dialogRef.close(createdMovie),
        error: (err) => console.error('Error al crear la película:', err)
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
