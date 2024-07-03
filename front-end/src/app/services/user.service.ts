import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl ='http://localhost:9090/user';
  constructor(private http: HttpClient) { }
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}`).pipe(
      catchError(error => {
        console.error('Get Users error', error);
        return throwError(() => new Error('Failed to load users'));
      })
    );
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error('Get User by ID error', error);
        return throwError(() => new Error('Failed to load user'));
      })
    );
  }

  getUsersByRole(role: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/role/${role}`).pipe(
      catchError(error => {
        console.error('Get Users by Role error', error);
        return throwError(() => new Error('Failed to load users by role'));
      })
    );
  }

  getUsersByRoleAndUniversity(role: string, universityId: string, niveauxEducatif: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/role/${role}/university/${universityId}/niveauxEducatif/${niveauxEducatif}`).pipe(
      catchError(error => {
        console.error('Get Users by Role and University error', error);
        return throwError(() => new Error('Failed to load users by role and university'));
      })
    );
  }

  updateUser(id: string, updateData: Partial<User>): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/${id}`, updateData).pipe(
      catchError(error => {
        console.error('Update User error', error);
        return throwError(() => new Error('Failed to update user'));
      })
    );
  }

  deleteUser(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error('Delete User error', error);
        return throwError(() => new Error('Failed to delete user'));
      })
    );
  }
}
