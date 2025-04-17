import { Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { DirectorDetailDialogsComponent } from './components/director-detail-dialogs/director-detail-dialogs.component';

export const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'detalles/:id', component: DirectorDetailDialogsComponent },
  { path: '**', redirectTo: '' }
];