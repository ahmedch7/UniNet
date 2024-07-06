import { Component, Inject, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-ban-user-modal',
  templateUrl: './ban-user-modal.component.html',
  styleUrls: ['./ban-user-modal.component.scss']
})
export class BanUserModalComponent  {

  errorMessage: string = '';

  constructor(
    private userService: UserService,
    public dialogRef: MatDialogRef<BanUserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { userId: string }
  ) {}

  banUser(): void {
    this.userService.updateUser(this.data.userId, { activeStatus: false }).subscribe({
      next: () => this.dialogRef.close(true),
      error: (err) => {
        this.errorMessage = 'Failed to ban user';
        console.error('Ban User error', err);
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

}
