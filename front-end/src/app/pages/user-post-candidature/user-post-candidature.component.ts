import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-post-candidature',
  templateUrl: './user-post-candidature.component.html',
  styleUrls: ['./user-post-candidature.component.scss']
})
export class UserPostCandidatureComponent implements OnInit {
  candidatureForm: FormGroup;
  postId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.candidatureForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      phoneNumber: ['', Validators.required],
      postId: [''],
      cv: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.postId = params['postId'];
      if (this.postId) {
        this.candidatureForm.patchValue({ postId: this.postId });
      }
    });
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.candidatureForm.patchValue({
        cv: file
      });
    }
  }

  onSubmit(): void {
    if (this.candidatureForm.valid) {
      const formData = new FormData();
      formData.append('userName', this.candidatureForm.get('userName')?.value);
      formData.append('phoneNumber', this.candidatureForm.get('phoneNumber')?.value);
      formData.append('postId', this.candidatureForm.get('postId')?.value);
      formData.append('cv', this.candidatureForm.get('cv')?.value);

      this.http.post('http://127.0.0.1:9090/candidature/', formData).subscribe(
        response => {
          console.log('Candidature created successfully', response);
          this.router.navigate(['/success']); // Navigate to success page or wherever you want
        },
        error => {
          console.error('Error creating candidature', error);
        }
      );
    }
  }
}
