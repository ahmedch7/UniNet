import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Forum } from "../../models/Forms";

@Component({
  selector: 'app-admin-forum',
  templateUrl: './admin-forum.component.html',
  styleUrls: ['./admin-forum.component.scss']
})
export class AdminForumComponent implements OnInit {
  private apiUrl = 'http://127.0.0.1:9090/forum';
   private fileURl = 'http://127.0.0.1:9090' ;
  forums: Forum[] = [];
  showCreateForm = false;
  newForum: Forum = new Forum({});
  selectedForum: Forum | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadForums();
  }

  loadForums(): void {
    this.getForums().subscribe(data => {
      this.forums = data;
    });
  }

  getForums(): Observable<Forum[]> {
    return this.http.get<Forum[]>(this.apiUrl);
  }

  getForumById(id: string): Observable<Forum> {
    return this.http.get<Forum>(`${this.apiUrl}/${id}`);
  }

  createForum(): void {
    // Add objectId of MongoDB
    this.newForum.userId = "5f9b1b7b7f1f3b1f3c7b7f1f";
    this.createForumRequest(this.newForum).subscribe(() => {
      this.loadForums();
      this.newForum = new Forum({});
      this.showCreateForm = false;
    });
  }

  createForumRequest(forum: Forum): Observable<Forum> {
    return this.http.post<Forum>(this.apiUrl, forum);
  }

  updateForum(id: string, forum: Forum): Observable<Forum> {
    return this.http.put<Forum>(`${this.apiUrl}/${id}`, forum);
  }

  deleteForum(id: string): void {
    this.deleteForumRequest(id).subscribe(() => {
      this.forums = this.forums.filter(f => f._id !== id);
    });
  }

  deleteForumRequest(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  toggleCreateForm(): void {
    this.showCreateForm = !this.showCreateForm;
  }

  showDetails(forum: Forum): void {
    this.selectedForum = forum;
  }

  closeDetails(): void {
    this.selectedForum = null;
  }

  downloadFile(cvPath: string): void {
    const downloadUrl = `${this.fileURl}/${cvPath}`; // Replace with your download endpoint
    window.open(downloadUrl, '_blank'); // Open file in a new tab
  }

  editForum(forum: Forum): void {
    // You can implement this method to handle editing logic
    // For example, pre-populate the create form with the forum details and set `showCreateForm` to true
  }
}
