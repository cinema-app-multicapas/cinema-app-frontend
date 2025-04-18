import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Director } from '../models/Director';

@Injectable({
  providedIn: 'root'
})
export class DirectorService {
  private apiUrl = 'http://localhost:8082/api/directors'; 

  constructor(private http: HttpClient) {}

  getDirectors(): Observable<Director[]> {
    return this.http.get<Director[]>(this.apiUrl);
  }

  getDirector(id: number): Observable<Director> {
    return this.http.get<Director>(`${this.apiUrl}/${id}`);
  }

  addDirector(director: Director): Observable<Director> {
    return this.http.post<Director>(this.apiUrl, director);
  }

  updateDirector(id: number, director: Director): Observable<Director> {
    return this.http.put<Director>(`${this.apiUrl}/${id}`, director);
  }

  deleteDirector(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}