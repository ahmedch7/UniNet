import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UniversityService } from 'src/app/services/university.service';

@Component({
  selector: 'app-create-uni-modal',
  templateUrl: './create-uni-modal.component.html',
  styleUrls: ['./create-uni-modal.component.scss']
})
export class CreateUniModalComponent implements OnInit {

  createForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private universityService: UniversityService,
    public dialogRef: MatDialogRef<CreateUniModalComponent>
  ) {
    this.createForm = this.fb.group({
      nom: ['', Validators.required],
      adresse: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
      emailContact: ['', [Validators.required, Validators.email]],
      telephoneContact: ['', [Validators.required, Validators.pattern(/^\d+$/)]]
    });
  }

  onSubmit(): void {
    if (this.createForm.valid) {
      this.universityService.createUniversity(this.createForm.value).subscribe({
        next: () => this.dialogRef.close(true),
        error: (err) => {
          this.errorMessage = 'Failed to create university';
          console.error('Create University error', err);
        }
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  ngOnInit(): void {
      
  }

}
