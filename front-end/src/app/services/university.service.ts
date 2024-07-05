import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { University } from '../models/university';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UniversityService {
  private apiUrl ='http://localhost:9090/university';
  constructor(private http: HttpClient) { }

  // Create a new university
  createUniversity(university: University): Observable<University> {
    return this.http.post<University>(`${this.apiUrl}`, university).pipe(
      catchError(error => {
        console.error('Create University error', error);
        return throwError(() => new Error('Failed to create university'));
      })
    );
  }

  // Get all universities
  getUniversities(): Observable<University[]> {
    return this.http.get<University[]>(`${this.apiUrl}`).pipe(
      catchError(error => {
        console.error('Get Universities error', error);
        return throwError(() => new Error('Failed to load universities'));
      })
    );
  }

  // Get a university by ID
  getUniversityById(id: string): Observable<University> {
    return this.http.get<University>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error('Get University by ID error', error);
        return throwError(() => new Error('Failed to load university'));
      })
    );
  }

  // Update a university by ID
  updateUniversity(id: string, university: Partial<University>): Observable<University> {
    return this.http.patch<University>(`${this.apiUrl}/${id}`, university).pipe(
      catchError(error => {
        console.error('Update University error', error);
        return throwError(() => new Error('Failed to update university'));
      })
    );
  }

  // Delete a university by ID
  deleteUniversity(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error('Delete University error', error);
        return throwError(() => new Error('Failed to delete university'));
      })
    );
  }
}
