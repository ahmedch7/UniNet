import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Salle } from '../models/salles';

@Injectable({
  providedIn: 'root'
})
export class SalleService {

  private apiUrl = `http://localhost:9090/salles`;

  constructor(private http: HttpClient) { }

  getSallesDisponibles(date: Date, heureDebut: Date, heureFin: Date): Observable<Salle[]> {
    const params = {
      date: date.toISOString(),
      heureDebut: heureDebut.toISOString(),
      heureFin: heureFin.toISOString()
    };
    return this.http.get<Salle[]>(`${this.apiUrl}/disponibles`, { params })
      .pipe(
        catchError(this.handleError)
      );
  }

  getAllSalles(): Observable<Salle[]> {
    return this.http.get<Salle[]>(`${this.apiUrl}/all`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getSalle(id: string): Observable<Salle> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Salle>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  createSalle(salleData: any): Observable<Salle> {
    const createUrl = `${this.apiUrl}/create`;

    return this.http.post<Salle>(createUrl, salleData)
      .pipe(
        catchError(this.handleError)
      );
  }

  getAllAvailableSalles(date: string, heureDebut: string, heureFin: string): Observable<Salle[]> {
    const params = new HttpParams()
      .set('date', date)
      .set('heureDebut', heureDebut)
      .set('heureFin', heureFin);
    const url = `${this.apiUrl}/disponibles`;
    return this.http.get<Salle[]>(url, { params })
      .pipe(
        catchError(this.handleError)
      );
  }

  updateSalle(id: string, salle: Salle): Observable<Salle> {
    return this.http.put<Salle>(`${this.apiUrl}/update/${id}`, salle)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteSalle(id: string): Observable<any> {
    const url = `${this.apiUrl}/delete/${id}`;
    return this.http.delete(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Client-side error:', error.error.message);
    } else {
      console.error(`Server-side error: Status ${error.status}, Message: ${error.message}`);
    }
    return throwError('Something bad happened; please try again later.');
  }
}
