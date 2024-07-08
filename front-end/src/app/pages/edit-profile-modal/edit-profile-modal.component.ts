import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { University } from 'src/app/models/university';
import { User } from 'src/app/models/user';
import { UniversityService } from 'src/app/services/university.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-profile-modal',
  templateUrl: './edit-profile-modal.component.html',
  styleUrls: ['./edit-profile-modal.component.scss']
})
export class EditProfileModalComponent implements OnInit {
  editProfileForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    public dialogRef: MatDialogRef<EditProfileModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User }
  ) {
    this.editProfileForm = this.fb.group({
      nom: [data.user.nom, Validators.required],
      prenom: [data.user.prenom, Validators.required],
      email: [data.user.email, [Validators.required, Validators.email]],
      numTel: [data.user.numTel, Validators.required],
      role: [{ value: data.user.role, disabled: true }],
      universiteAssociee: [data.user.universiteAssociee ? data.user.universiteAssociee._id : ''],
      entreprise: [data.user.entreprise],
      niveauxEducatif: [data.user.niveauxEducatif],
      dateDeNaissance: [data.user.dateDeNaissance, Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.editProfileForm.valid) {
      this.userService.updateUser(this.data.user._id, this.editProfileForm.value).subscribe({
        next: () => this.dialogRef.close(true),
        error: (err) => {
          this.errorMessage = 'Failed to update profile';
          console.error('Update User error', err);
        }
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}

