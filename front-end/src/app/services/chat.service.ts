import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChatMessage } from '../models/chatMessage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private apiUrl =  'http://localhost:9090/chat/'

  constructor(private http: HttpClient) { }

  getChatMessages(classId: string): Observable<ChatMessage[]> {
    return this.http.get<ChatMessage[]>(`${this.apiUrl}/class/${classId}`);
  }

  addChatMessage(classId: string, messageText: string, userId: string): Observable<ChatMessage> {
    return this.http.post<ChatMessage>(`${this.apiUrl}/${classId}/messages`, { text: messageText, userId });
  }
}
