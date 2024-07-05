import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { University } from 'src/app/models/university';
import { AuthService } from 'src/app/services/auth.service';
import { UniversityService } from 'src/app/services/university.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  signupForm: FormGroup;
  errorMessage: string = '';
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;
  universities: University[] = [];
  maxDate: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private universityService: UniversityService,
    private router: Router
  ) {
    this.signupForm = this.fb.group(
      {
        nom: ['', Validators.required],
        prenom: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        motDePasse: ['', [Validators.required, Validators.minLength(6)]],
        dateDeNaissance: ['', Validators.required],
        numTel: ['', Validators.required],
        role: ['', Validators.required],
        universiteAssociee: [''],
        entreprise: [''],
        niveauxEducatif: [''],
        avatar: [null],
      }
    );

    const today = new Date();
    const maxDate = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate()
    );
    this.maxDate = maxDate.toISOString().split('T')[0]; // Format to 'YYYY-MM-DD'
  }
  ngOnInit(): void {
    this.universityService.getUniversities().subscribe({
      next: (universities) => (this.universities = universities),
      error: (err) => {
        this.errorMessage = 'Failed to load universities';
        console.error('Get Universities error', err);
      },
    });
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.preview();
  }
  preview() {
    if (this.selectedFile) {
      const reader = new FileReader();
      console.log(reader);

      reader.onload = (e) => (this.previewUrl = reader.result);
      reader.readAsDataURL(this.selectedFile);
      console.log(reader.result);
    } else {
      this.previewUrl = null;
    }
  }
  onSubmit() {
    if (this.signupForm.valid) {
      const formData = new FormData();
      Object.keys(this.signupForm.controls).forEach((key) => {
        let value = this.signupForm.get(key)?.value;

        // Replace universiteAssociee name with its ID
        if (key === 'universiteAssociee' && value) {
          const selectedUniversity = this.universities.find(
            (university) => university.nom === value
          );
          value = selectedUniversity?._id || value;
        }

        formData.append(key, value);
      });
      if (this.selectedFile) {
        formData.append('avatar', this.selectedFile, this.selectedFile.name);
      }

      this.authService.signup(formData).subscribe({
        next: () => {
          this.authService
            .sendValidationEmail(this.signupForm.value.email)
            .subscribe({
              next: () => {
                this.router.navigate(['/validate-email'], {
                  queryParams: { email: this.signupForm.value.email },
                });
              },
              error: (err) => {
                this.errorMessage = 'Failed to send validation email.';
                console.error('Send validation email error', err);
              },
            });
        },
        error: (err) => {
          this.errorMessage = 'Registration failed.';
          console.error('Signup error', err);
        },
      });
    }
  }

}
