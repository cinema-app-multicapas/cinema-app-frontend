// main.component.ts
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Director } from '../../models/Director';
import { NotificationService } from '../../services/notificacion.service';
import { NewDirectorComponent } from '../new-director/new-director.component';
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
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DirectorService } from '../../services/director.service';

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
    HttpClientModule,
    MatSnackBarModule
  ],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  directors: Director[] = [];
  loading = true;
  searchTerm = '';
  
  constructor(
    private directorService: DirectorService, // Inyecta el servicio
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.loadDirectors();
  }
  
  loadDirectors(): void {
    this.loading = true;
    this.directorService.getDirectors().subscribe({
      next: (data) => {
        this.directors = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar directores:', error);
        this.snackBar.open('Error al cargar directores', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'top'
        });
        this.loading = false;
      }
    });
  }

  get filteredDirectors(): Director[] {
    const term = this.searchTerm.toLowerCase();
    return this.directors.filter(d =>
      d.name.toLowerCase().includes(term) ||
      d.nationality.toLowerCase().includes(term)
    );
  }
  
  openDirectorDialog(): void {
    const dialogRef = this.dialog.open(NewDirectorComponent, {
      width: '500px',
      disableClose: true
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Añadir el nuevo director a la lista
        this.directors.push(result);
        
        // Mostrar mensaje de confirmación
        this.snackBar.open(`Director ${result.name} añadido correctamente`, 'Cerrar', {
          duration: 3000,
          verticalPosition: 'top'
        });
      }
    });
  }
  
  viewDirector(director: Director): void {
    this.router.navigate(['/detalles', director.id], { 
      state: { director: director }
    });
  }
  
  deleteDirector(director: Director): void {
    if (confirm(`¿Estás seguro de que deseas eliminar a ${director.name}?`)) {
      this.directorService.deleteDirector(director.id!).subscribe({
        next: () => {
          this.directors = this.directors.filter(d => d.id !== director.id);
          this.snackBar.open(`Director ${director.name} eliminado correctamente`, 'Cerrar', {
            duration: 3000,
            verticalPosition: 'top'
          });
        },
        error: (error) => {
          console.error('Error al eliminar director:', error);
          this.snackBar.open('Error al eliminar director', 'Cerrar', {
            duration: 3000,
            verticalPosition: 'top'
          });
        }
      });
    }
  }
}