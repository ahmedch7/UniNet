import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoyerService {
  private apiUrl = 'http://localhost:9090/api/foyers';

  constructor(private http: HttpClient) { }

  getFoyers(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl);
  }
  

  createFoyer(foyer: any): Observable<any> {
    return this.http.post(this.apiUrl, foyer);
  }

  updateFoyer(id: string, foyer: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, foyer);
  }

  deleteFoyer(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getAvailablePlaces(): Observable<any> {
    return this.http.get(`${this.apiUrl}/available`);
  }
}
