import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Classe } from '../models/classe';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ClasseService {

  private apiUrl =  'http://localhost:9090/classe'
  constructor( private http: HttpClient) {}

  createClasse(Classe: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, Classe);
  }

  getClasse(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/get`);
  }

  getClasseById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getClasseByNiveau(niveauEducatifId: string): Observable<Classe[]> {
    return this.http.get<Classe[]>(`${this.apiUrl}/classes/${niveauEducatifId}`);
  }

  getUnassignedStudents(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/student/unassigned`);
  }
  
  getStudentsByClasse(id: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/students/${id}`).pipe(
      catchError(error => {
        console.error(`Error fetching students for class ${id}`, error);
        throw error; // Ensure the error is rethrown to be caught by the subscriber
      })
    );
  }

  updateClasseById(Classe: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${Classe._id}`, Classe );
  }

  deleteClasse(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  assignStudentToClass(classId: string, studentId: string): Observable<any> {
    const payload = { studentIds: [studentId] }; // Adjust payload as per backend requirements
    return this.http.post(`${this.apiUrl}/classes/${classId}/assign-students`, payload);
  }



  
}
