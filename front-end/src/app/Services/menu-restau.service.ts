import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuRestauService {
  private apiUrl = 'http://localhost:9090/api/menus'; // Assurez-vous que l'URL correspond à votre API backend

  constructor(private http: HttpClient) { }

  getMenus(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createMenu(menu: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, menu);
  }

  updateMenu(id: string, menu: FormData): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, menu);
  }

  deleteMenu(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  addComment(menuId: string, comment: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${menuId}/comments`, comment);
  }

  getComments(menuId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${menuId}/comments`);
  }
}
