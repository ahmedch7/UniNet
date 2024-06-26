import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Forum } from "../../models/Forms";

@Component({
  selector: 'app-user-forum',
  templateUrl: './user-forum.component.html',
  styleUrls: ['./user-forum.component.scss']
})
export class UserForumComponent implements OnInit {
  private apiUrl = 'http://127.0.0.1:9090/forum'; // Replace with your API URL

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
  }

  createForum(forumForm: Forum): Observable<Forum> {
    const forum: Forum = {
      titreForum: forumForm.titreForum,
      descriptionForum: forumForm.descriptionForum,
      category: forumForm.category,
      userId: "5f9b1b7b7f1f3b1f3c7b7f1f" // Replace with actual user ID logic
    };
    return this.http.post<Forum>(this.apiUrl, forum);
  }

  onSubmit(form: any): void {
    if (form.valid) {
      const newForm: Forum = {
        userId: "5f9b1b7b7f1f3b1f3c7b7f1f",

        titreForum: form.value.titreForum,
        descriptionForum: form.value.descriptionForum,
        category: form.value.category
      };

      this.createForum(newForm).subscribe(
        (response) => {
          console.log('Forum created successfully:', response);
          this.toastr.success('Forum created successfully!', 'Success');
          this.router.navigateByUrl('/user-posts'); // Navigate to user-posts route after successful creation
          form.reset(); // Reset the form after successful submission
        },
        (error) => {
          console.error('Error creating forum:', error);
          this.toastr.error('Error creating forum!', 'Error');
          // Handle error response here
        }
      );
    }
  }
}
