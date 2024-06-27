import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Commentaire} from "../../models/commentaire";

@Component({
  selector: 'app-user-commentaire',
  templateUrl: './user-commentaire.component.html',
  styleUrls: ['./user-commentaire.component.scss']
})
export class UserCommentaireComponent implements OnInit {

  private apiUrl = ' http://127.0.0.1:9090/commentaires'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  getCommentaires(): Observable<Commentaire[]> {
    return this.http.get<Commentaire[]>(this.apiUrl);
  }

  getCommentaireById(id: string): Observable<Commentaire> {
    return this.http.get<Commentaire>(`${this.apiUrl}/${id}`);
  }

  createCommentaire(commentaire: Commentaire): Observable<Commentaire> {
    return this.http.post<Commentaire>(this.apiUrl, commentaire);
  }

  updateCommentaire(id: string, commentaire: Commentaire): Observable<Commentaire> {
    return this.http.put<Commentaire>(`${this.apiUrl}/${id}`, commentaire);
  }

  deleteCommentaire(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }


}
