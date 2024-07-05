import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursService {
  private apiUrl = 'http://localhost:9090/cours';
  constructor(private http: HttpClient) {}

  createCours(cours: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, cours);
  }

  getCours(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/get`);
  }

  getCoursById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getCoursesByClasse(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/courses/classe/${id}`);
  }

  updateCoursById(id: string, cours: FormData): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}`, cours);
  }

  deleteCours(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  downloadFile(courseId: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/download/${courseId}`, { responseType: 'blob' });
  }
}
