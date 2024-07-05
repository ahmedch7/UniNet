import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from "../../models/posts";
import { Commentaire } from "../../models/commentaire";
import { Router } from "@angular/router";
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.scss']
})
export class UserPostsComponent implements OnInit {
  private apiUrl = 'http://127.0.0.1:9090/post';
  private commentApiUrl = 'http://127.0.0.1:9090/commentaire'; // Replace with your API URL
  posts: Post[] = [];
  filteredPosts: Post[] = []; // Array to hold filtered posts
  newPostContent: string = '';
  filterType: string = 'recent'; // Default filter type
  private currentUser: User | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loadPosts();
    const user = localStorage.getItem('currentUser');
    this.currentUser = JSON.parse(user);
  }

  loadPosts(): void {
    this.getPosts().subscribe(data => {
      this.posts = data.map(post => ({
        ...post,
        showCommentField: false,
        newCommentContent: '',
        comments: [],
      }));
      this.applyFilter(); // Initially load posts with default filter
      this.loadComments();
    });
  }

  loadComments(): void {
    this.posts.forEach(post => {
      this.getComments(post._id).subscribe(comments => {
        post.comments = comments;
      });
    });
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl);
  }

  getComments(postId: string): Observable<Commentaire[]> {
    return this.http.get<Commentaire[]>(`${this.commentApiUrl}/getByPostId?postId=${postId}`);
  }

  createPost(): void {
    const newPost: Post = {
      _id: null,
      userId: this.currentUser._id, // Replace with actual user ID
      contenuPost: this.newPostContent,
      likes: [],
      dislikes: [],
      comments: []
    };

    this.http.post<Post>(this.apiUrl, newPost).subscribe(post => {
      this.posts.unshift({ ...post, showCommentField: false, newCommentContent: '', comments: [] });
      this.newPostContent = '';
      this.applyFilter(); // Automatically apply filter after new post creation
    });
  }

  likePost(post: Post): void {
    console.log(`Liked post with ID: ${post._id}`);
  }

  dislikePost(post: Post): void {
    console.log(`Disliked post with ID: ${post._id}`);
  }

  reportPost(post: Post): void {
    console.log(`Reported post with ID: ${post._id}`);
  }

  toggleCommentField(post: Post): void {
    post.showCommentField = !post.showCommentField;
  }

  addComment(post: Post): void {
    const newComment: Commentaire = {
      _id: null,
      contenuCommentaire: post.newCommentContent,
      userId: this.currentUser._id, // Replace with actual user ID
      postId: post._id,
      likes: [],
      dislikes: []
    };

    this.http.post<Commentaire>(this.commentApiUrl, newComment).subscribe(comment => {
      post.comments.push(comment);
      post.newCommentContent = '';
    });
  }

  applyToPost(post: any): void {
    this.router.navigate(['/user-candidature-post'], { queryParams: { postId: post._id } });
  }

  applyFilter(): void {
    if (this.filterType === 'recent') {
      // Filter recent posts
      this.filteredPosts = this.posts.filter(post => {
        const postDate = new Date(post.createdAt); // Assuming createdAt is a valid Date field
        const today = new Date();
        const differenceInDays = Math.ceil((today.getTime() - postDate.getTime()) / (1000 * 3600 * 24));
        return differenceInDays <= 7; // Filter posts created in the last 7 days
      });
    } else if (this.filterType === 'old') {
      // Filter old posts
      this.filteredPosts = this.posts.filter(post => {
        const postDate = new Date(post.createdAt); // Assuming createdAt is a valid Date field
        const today = new Date();
        const differenceInDays = Math.ceil((today.getTime() - postDate.getTime()) / (1000 * 3600 * 24));
        return differenceInDays > 7; // Filter posts older than 7 days
      });
    } else {
      // Default to show all posts if filterType is invalid
      this.filteredPosts = [...this.posts];
    }
  }
}
