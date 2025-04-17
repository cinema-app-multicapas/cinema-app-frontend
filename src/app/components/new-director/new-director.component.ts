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

@Component({
  selector: 'app-director-dialog',
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
  template: `
    <h2 mat-dialog-title>Nuevo Director</h2>
    <mat-dialog-content>
      <form [formGroup]="directorForm" class="director-form">
        <mat-form-field appearance="outline">
          <mat-label>Nombre</mat-label>
          <input matInput formControlName="name" placeholder="Nombre completo">
          <mat-error *ngIf="directorForm.get('name')?.hasError('required')">El nombre es obligatorio</mat-error>
        </mat-form-field>
        
        <mat-form-field appearance="outline">
          <mat-label>Nacionalidad</mat-label>
          <input matInput formControlName="nationality" placeholder="Ej. Estadounidense">
          <mat-error *ngIf="directorForm.get('nationality')?.hasError('required')">La nacionalidad es obligatoria</mat-error>
        </mat-form-field>
        
        <mat-form-field appearance="outline">
          <mat-label>Fecha de nacimiento</mat-label>
          <input matInput [matDatepicker]="picker" formControlName="birth_date">
          <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
          <mat-datepicker #picker></mat-datepicker>
          <mat-error *ngIf="directorForm.get('birth_date')?.hasError('required')">La fecha de nacimiento es obligatoria</mat-error>
        </mat-form-field>
        
        <mat-form-field appearance="outline">
          <mat-label>URL de la foto</mat-label>
          <input matInput formControlName="photo_url" placeholder="https://...">
          <mat-hint>Deja en blanco para usar una imagen por defecto</mat-hint>
        </mat-form-field>
        
        <mat-form-field appearance="outline">
          <mat-label>Biografía</mat-label>
          <textarea matInput formControlName="biography" rows="5" placeholder="Breve reseña biográfica..."></textarea>
          <mat-error *ngIf="directorForm.get('biography')?.hasError('required')">La biografía es obligatoria</mat-error>
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancelar</button>
      <button mat-raised-button color="primary" (click)="onSubmit()" [disabled]="directorForm.invalid">Guardar</button>
    </mat-dialog-actions>
  `,
  styles: [`
    .director-form {
      display: flex;
      flex-direction: column;
      min-width: 350px;
    }
    
    mat-form-field {
      width: 100%;
      margin-bottom: 8px;
    }
    
    mat-dialog-actions {
      padding: 16px 0;
    }
  `]
})
export class DirectorDialogComponent {
  directorForm: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DirectorDialogComponent>
  ) {
    this.directorForm = this.fb.group({
      name: ['', Validators.required],
      nationality: ['', Validators.required],
      birth_date: [new Date(), Validators.required],
      photo_url: [''],
      biography: ['', Validators.required]
    });
  }
  
  onSubmit(): void {
    if (this.directorForm.valid) {
      const newDirector: Director = {
        ...this.directorForm.value,
        id: Date.now() // Generar un ID temporal basado en timestamp
      };
      this.dialogRef.close(newDirector);
    }
  }
  
  onCancel(): void {
    this.dialogRef.close();
  }
}