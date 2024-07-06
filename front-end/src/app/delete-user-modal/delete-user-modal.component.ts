import { Component, Inject, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-user-modal',
  templateUrl: './delete-user-modal.component.html',
  styleUrls: ['./delete-user-modal.component.scss']
})
export class DeleteUserModalComponent {
  errorMessage: string = '';

  constructor(
    private userService: UserService,
    public dialogRef: MatDialogRef<DeleteUserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { userId: string }
  ) {}

  deleteUser(): void {
    this.userService.deleteUser(this.data.userId).subscribe({
      next: () => this.dialogRef.close(true),
      error: (err) => {
        this.errorMessage = 'Failed to delete user';
        console.error('Delete User error', err);
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
