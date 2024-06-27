// comment.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'http://localhost:9090/api/comments'; // Assurez-vous que l'URL correspond à votre API backend

  constructor(private http: HttpClient) { }

  addComment(menuId: string, comment: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${menuId}/comments`, comment);
  }

  getComments(menuId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${menuId}/comments`);
  }
}
