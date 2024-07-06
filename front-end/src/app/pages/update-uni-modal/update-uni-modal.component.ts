import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { University } from 'src/app/models/university';
import { UniversityService } from 'src/app/services/university.service';

@Component({
  selector: 'app-update-uni-modal',
  templateUrl: './update-uni-modal.component.html',
  styleUrls: ['./update-uni-modal.component.scss']
})
export class UpdateUniModalComponent implements OnInit {

  updateForm: FormGroup;
  errorMessage: string = '';
  universities: University[] = [];

  constructor(
    private fb: FormBuilder,
    private universityService: UniversityService,
    public dialogRef: MatDialogRef<UpdateUniModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { university: University }
  ) {
    this.updateForm = this.fb.group({
      nom: [data.university.nom, Validators.required],
      adresse: [data.university.adresse, [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
      emailContact: [data.university.emailContact, [Validators.required, Validators.email]],
      telephoneContact: [data.university.telephoneContact, [Validators.required, Validators.pattern(/^\d+$/)]]
    });
  }

  onSubmit(): void {
    if (this.updateForm.valid) {
      this.universityService.updateUniversity(this.data.university._id, this.updateForm.value).subscribe({
        next: () => this.dialogRef.close(true),
        error: (err) => {
          this.errorMessage = 'Failed to update university';
          console.error('Update University error', err);
        }
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
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
}
