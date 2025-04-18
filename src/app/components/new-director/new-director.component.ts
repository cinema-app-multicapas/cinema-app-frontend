import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Director } from '../../models/Director';
import { DirectorService } from '../../services/director.service';

@Component({
  selector: 'app-new-director',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './new-director.component.html',
  styleUrls: ['./new-director.component.css']
})
export class NewDirectorComponent {
  directorForm: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<NewDirectorComponent>, 
    private directorService: DirectorService
  ) {
    this.directorForm = this.fb.group({
      name: ['', Validators.required],
      nationality: ['', Validators.required],
      birthDate: [new Date(), Validators.required],
      photoUrl: [''],
      biography: ['', Validators.required]
    });
  }
  
  onSubmit(): void {
    if (this.directorForm.valid) {
      const newDirector: Director = this.directorForm.value;
      
      this.directorService.addDirector(newDirector).subscribe({
        next: (createdDirector) => {
          this.dialogRef.close(createdDirector); 
        },
        error: (err) => {
          console.error('Error al crear el director:', err);
        }
      });
    }
  }
  
  
  onCancel(): void {
    this.dialogRef.close();
  }
}