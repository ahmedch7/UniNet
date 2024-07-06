import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  public currentUser: User | null = null;
  public previewUrl: string | ArrayBuffer | null = null;
  constructor() { }

  ngOnInit() {
    const user = localStorage.getItem('currentUser');
    this.currentUser = JSON.parse(user);
    this.previewUrl = `http://localhost:9090/img/${this.currentUser.avatar}`;
  }

}
