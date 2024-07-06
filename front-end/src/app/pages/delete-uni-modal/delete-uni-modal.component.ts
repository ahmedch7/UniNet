import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UniversityService } from 'src/app/services/university.service';

@Component({
  selector: 'app-delete-uni-modal',
  templateUrl: './delete-uni-modal.component.html',
  styleUrls: ['./delete-uni-modal.component.scss']
})
export class DeleteUniModalComponent  {

  errorMessage: string = '';

  constructor(
    private universityService: UniversityService,
    public dialogRef: MatDialogRef<DeleteUniModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { universityId: string }
  ) {}

  confirmDelete(): void {
    this.universityService.deleteUniversity(this.data.universityId).subscribe({
      next: () => this.dialogRef.close(true),
      error: (err) => {
        this.errorMessage = 'Failed to delete university';
        console.error('Delete University error', err);
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

}
