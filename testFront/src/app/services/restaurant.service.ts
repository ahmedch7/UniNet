import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private apiUrl = 'http://localhost:9090/api'; // Assurez-vous que l'URL correspond à votre API backend

  constructor(private http: HttpClient) { }

  getRestaurants(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/restaurants`);
  }

  createRestaurant(restaurant: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/restaurants`, restaurant);
  }

  updateRestaurant(restaurantId: string, restaurant: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/restaurants/${restaurantId}`, restaurant);
  }

  deleteRestaurant(restaurantId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/restaurants/${restaurantId}`);
  }

  // Ajoutez d'autres méthodes CRUD si nécessaire
}
