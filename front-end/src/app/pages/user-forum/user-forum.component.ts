import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  selectedFile: File | null = null;
  categories: string[] = ['Technology', 'Science', 'Health', 'Business', 'Entertainment', 'MEDICS']; // Add your categories here

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  createForum(formData: FormData): Observable<Forum> {
    return this.http.post<Forum>(this.apiUrl, formData);
  }

  onSubmit(form: any): void {
    if (form.valid) {
      const formData = new FormData();
      formData.append('titreForum', form.value.titreForum);
      formData.append('descriptionForum', form.value.descriptionForum);
      formData.append('category', form.value.category);
      formData.append('userId', "5f9b1b7b7f1f3b1f3c7b7f1f"); // Replace with actual user ID logic

      if (this.selectedFile) {
        formData.append('cv_path', this.selectedFile);
      }

      this.createForum(formData).subscribe(
        (response) => {
          console.log('Forum created successfully:', response);
          this.toastr.success('Forum created successfully!', 'Success');
          this.router.navigateByUrl('/user-posts'); // Navigate to user-posts route after successful creation
          form.reset(); // Reset the form after successful submission
          this.selectedFile = null; // Reset the file input
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
