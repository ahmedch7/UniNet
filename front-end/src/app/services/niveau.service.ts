import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NiveauService {

  

  private apiUrl =  'http://localhost:9090/niveauEtude'
  constructor( private http: HttpClient) {}

  createEvent(NiveauEducatif: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, NiveauEducatif);
  }

  getNiveau(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/get`);
  }

  getNiveauById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  updateNiveauById(NiveauEducatif: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${NiveauEducatif._id}`, NiveauEducatif );
  }

  deleteNiveau(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
