import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationRestaurantService {

  private apiUrl = 'http://localhost:9090/api'; // Assurez-vous que l'URL correspond à votre API backend

  constructor(private http: HttpClient) { }

  createReservation(reservation: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/restaurant-reservation`, reservation);
  }

  getRestaurantReservations(restaurantId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/restaurant-reservation/${restaurantId}`);
  }

  deleteRestaurantReservation(reservationId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/restaurant-reservation/${reservationId}`);
  }

  // Ajoutez d'autres méthodes pour récupérer, mettre à jour et supprimer les réservations si nécessaire
}