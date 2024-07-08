import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/models/user';
import { EditProfileModalComponent } from '../edit-profile-modal/edit-profile-modal.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  public currentUser: User | null = null;
  public previewUrl: string | ArrayBuffer | null = null;

  constructor(public dialog: MatDialog) { }
  ngOnInit() {
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.currentUser = JSON.parse(user);
      this.previewUrl = `http://localhost:9090/img/${this.currentUser.avatar}`;
    }
  }

  openEditProfileModal(): void {
    const dialogRef = this.dialog.open(EditProfileModalComponent, {
      width: '500px',
      height: '600px',
      data: { user: this.currentUser }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Reload user data or handle the result
      }
    });
  }}
