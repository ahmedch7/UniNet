import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

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
  deleteComment(eventId: string, commentId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${eventId}/comments/${commentId}`);
  }

  updateComment(eventId: string, commentId: string, text: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${eventId}/comments/${commentId}`, { text });
  }
  participateEvent(eventId: string, userId: string, username: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${eventId}/participate`, { userId, username });
  }
  deleteParticipation(eventId: string, participationId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${eventId}/participants/${participationId}`);
  }
  getParticipatedEvents(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/participated-events`, {
      params: { userId }
    });
  }

  getRecommendedEvents(userId: string, tags: string[], categories: string[]): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/recommended-events`, {
      params: {
        userId,
        tags: tags.join(','),
        categories: categories.join(',')
      }
    });
  }
  fetchRecommendedEvents(userId: string): Observable<Event[]> {
    return this.http.get<Event[]>(`http://localhost:3000/api/events/recommended-events?userId=${userId}`);
}
getNearbyEvents(latitude: number, longitude: number): Observable<Event[]> {
  return this.http.get<Event[]>(`${this.apiUrl}/nearby-events?latitude=${latitude}&longitude=${longitude}`);
}
getEventCategoryCounts(): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/events/categories/count`);
}
getEventsByStatus(): Observable<any> {
  // Adjust the endpoint according to your API structure
  return this.http.get<any>(`${this.apiUrl}/events/status`);
}
}
