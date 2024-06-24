import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private apiUrl = 'http://localhost:9090/api/rooms';

  constructor(private http: HttpClient) { }

  getRooms(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getRoomsByFoyerId(foyerId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?foyerId=${foyerId}`);
  }
  

  createRoom(room: any): Observable<any> {
    return this.http.post(this.apiUrl, room);
  }

  updateRoom(id: string, room: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, room);
  }

  deleteRoom(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  reserveRoom(reservation: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/reserve`, reservation);
  }

  cancelReservation(reservationId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/cancel/${reservationId}`);
  }
}
