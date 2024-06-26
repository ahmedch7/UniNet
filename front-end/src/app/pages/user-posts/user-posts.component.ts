import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from "../../models/posts";

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.scss']
})
export class UserPostsComponent implements OnInit {
  private apiUrl = 'http://127.0.0.1:9090/post'; // Replace with your API URL
  posts: Post[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.getPosts().subscribe(data => {
      this.posts = data;
    });
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl);
  }

  likePost(post: Post): void {
    // Implement like functionality here
    console.log(`Liked post with ID: ${post.postId}`);
  }

  dislikePost(post: Post): void {
    // Implement dislike functionality here
    console.log(`Disliked post with ID: ${post.postId}`);
  }

  reportPost(post: Post): void {
    // Implement report functionality here
    console.log(`Reported post with ID: ${post.postId}`);
  }

  commentOnPost(post: Post): void {
    // Implement comment functionality here
    console.log(`Commenting on post with ID: ${post.postId}`);
  }
}
