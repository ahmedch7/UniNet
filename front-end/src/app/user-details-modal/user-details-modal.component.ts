import { Component, Inject, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-details-modal',
  templateUrl: './user-details-modal.component.html',
  styleUrls: ['./user-details-modal.component.scss']
})
export class UserDetailsModalComponent implements OnInit {

  user: User | null = null;
  errorMessage: string = '';

  constructor(
    private userService: UserService,
    public dialogRef: MatDialogRef<UserDetailsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { userId: string }
  ) {}

  ngOnInit(): void {
    console.log("Loading");
    this.userService.getUserById(this.data.userId).subscribe({
      next: (user) => this.user = user,
      error: (err) => {
        this.errorMessage = 'Failed to load user details';
        console.error('Get User by ID error', err);
      }
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }
  formatDate(date: Date | undefined): string {
    return date ? new Date(date).toLocaleDateString() : 'N/A';
  }

}
