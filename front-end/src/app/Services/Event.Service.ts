import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private apiUrl = 'http://localhost:3000/api/events'; 

  constructor(private http: HttpClient) { }

  createEvent(eventData: any): Observable<any> {
    return this.http.post(this.apiUrl, eventData);
  }
  private handleError(error: HttpErrorResponse) {
    console.error('HTTP error occurred:', error);
    return throwError('Something went wrong; please try again later.');
  }
  getEvents(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  } 
  getEvent(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  updateEvent(event: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${event._id}`, event);
  }

  deleteEvent(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
  likeEvent(eventId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${eventId}/like`, {});
  }

  dislikeEvent(eventId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${eventId}/dislike`, {});
  }

  addComment(eventId: string, commentText: string,userId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${eventId}/comments`, { text: commentText,userId: userId });
  }
  deleteComment(eventId: string, commentId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${eventId}/comments/${commentId}`);
  }

  updateComment(eventId: string, commentId: string, updatedText: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${eventId}/comments/${commentId}`, { text: updatedText });
  }
}
