import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Commentaire} from "../../models/commentaire";

@Component({
  selector: 'app-admin-commentaire',
  templateUrl: './admin-commentaire.component.html',
  styleUrls: ['./admin-commentaire.component.scss']
})
export class AdminCommentaireComponent implements OnInit {
  private apiUrl = ' http://127.0.0.1:9090/commentaire'; // Replace with your API URL
  commentaires: Commentaire[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getCommentaires().subscribe(data => {
      this.commentaires = data;
    });
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

  deleteCommentaire(id: string): void {
    this.http.delete<void>(`${this.apiUrl}/${id}`).subscribe(() => {
      this.commentaires = this.commentaires.filter(commentaire => commentaire._id !== id);
    });
  }

}
