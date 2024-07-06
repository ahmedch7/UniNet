import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { University } from '../models/university';
import { UserService } from '../services/user.service';
import { UniversityService } from '../services/university.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-user-modal',
  templateUrl: './update-user-modal.component.html',
  styleUrls: ['./update-user-modal.component.scss']
})
export class UpdateUserModalComponent implements OnInit {
  updateForm: FormGroup;
  errorMessage: string = '';
  universities: University[] = [];  // Add this line

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private universityService: UniversityService,  // Add this line
    public dialogRef: MatDialogRef<UpdateUserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { userId: string }
  ) {
    this.updateForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      numTel: ['', Validators.required],
      role: ['', Validators.required],
      universiteAssociee: [''],
      entreprise: [''],
      niveauxEducatif: [''],
      isActive: [true]
    });
  }

  ngOnInit(): void {
    this.userService.getUserById(this.data.userId).subscribe({
      next: (user) => {
        this.updateForm.patchValue(user);
        // Fetch universities after user data is loaded
        this.universityService.getUniversities().subscribe({
          next: (universities) => {
            this.universities = universities;
            // Set current university selection
            if (user.universiteAssociee) {
              const currentUniversity = this.universities.find(
                (university) => university._id === user.universiteAssociee?._id
              );
              if (currentUniversity) {
                this.updateForm.patchValue({
                  universiteAssociee: currentUniversity._id
                });
              }
            }
          },
          error: (err) => {
            this.errorMessage = 'Failed to load universities';
            console.error('Get Universities error', err);
          }
        });
      },
      error: (err) => {
        this.errorMessage = 'Failed to load user details';
        console.error('Get User by ID error', err);
      }
    });
  }

  onSubmit(): void {
    if (this.updateForm.valid) {
      this.userService.updateUser(this.data.userId, this.updateForm.value).subscribe({
        next: () => this.dialogRef.close(true),
        error: (err) => {
          this.errorMessage = 'Failed to update user';
          console.error('Update User error', err);
        }
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

}
