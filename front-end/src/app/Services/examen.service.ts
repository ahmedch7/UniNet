import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpHeaders  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Examen } from '../models/examens';  // Assurez-vous que le chemin d'import est correct
import { Salle } from '../models/salles'; // Assurez-vous que le chemin d'import est correct

@Injectable({
  providedIn: 'root'
})
export class ExamenService {
  private apiUrl = 'http://127.0.0.1:9090/examens';
  private sallesUrl = 'http://127.0.0.1:9090/salles'; // Adjust URL as per your API endpoint for salles

  constructor(private http: HttpClient) { }

  affecterExamenSalle(examenData: Examen): Observable<Examen> {
    return this.http.post<Examen>(`${this.apiUrl}/affecter`, examenData);
  }
  // Method to fetch available salles based on date, heureDebut, and heureFin

  // Get all examens
  getExamens(): Observable<Examen[]> {
    const url = `${this.apiUrl}/all`;
    return this.http.get<Examen[]>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Get examen by id
  getExamen(id: string): Observable<Examen> {
    const url = `${this.apiUrl}/allID/${id}`;
    return this.http.get<Examen>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Create a new examen
  createExamen(formData: FormData): Observable<Examen> {
    const url = `${this.apiUrl}/create`;
    return this.http.post<Examen>(url, formData)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Update an examen
  updateExamen(id: string, examenData: Examen): Observable<Examen> {
    const url = `${this.apiUrl}/update/${id}`;
    return this.http.patch<Examen>(url, examenData)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Delete an examen
  deleteExamen(id: string): Observable<void> {
    const url = `${this.apiUrl}/dele/${id}`;
    return this.http.delete<void>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Get examens by salle idzz

getSallesDisponibles(date: string, heureDebut: string, heureFin: string): Observable<Salle[]> {
const body = { date, heureDebut, heureFin };
return this.http.post<Salle[]>(`${this.sallesUrl}/salles/disponibles`, body).pipe(
catchError(this.handleError)
);
}

  // Handle errors
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something went wrong; please try again later.');
  }
  
}

