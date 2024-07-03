import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentRestauService {
  private apiUrl = 'http://localhost:9090/api/comments'; // Mise à jour de l'URL de base

  constructor(private http: HttpClient) { }

  addComment(menuId: string, comment: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${menuId}/comments`, comment);
  }
  
  getComments(menuId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${menuId}/comments`);
  }

  deleteComment(menuId: string, commentId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${menuId}/comments/${commentId}`);
  }
}
