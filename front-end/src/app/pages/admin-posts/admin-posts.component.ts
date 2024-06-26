import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Post} from "../../models/posts";

@Component({
  selector: 'app-admin-posts',
  templateUrl: './admin-posts.component.html',
  styleUrls: ['./admin-posts.component.scss']
})
export class AdminPostsComponent implements OnInit {

  private apiUrl = 'http://localhost:9090/post'; // Replace with your API URL
  posts: Post[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getPosts().subscribe(data => {
      this.posts = data;
    });
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl);
  }

  deletePost(id: string): void {
    this.http.delete<void>(`${this.apiUrl}/${id}`).subscribe(() => {
      // @ts-ignore
      this.posts = this.posts.filter(post => post.postId !== id);
    });
  }
}
