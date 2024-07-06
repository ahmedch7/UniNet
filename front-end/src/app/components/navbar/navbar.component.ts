import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  public currentUser: User | null = null;
  public previewUrl: string | ArrayBuffer | null = null;
  constructor(location: Location,  private element: ElementRef,private authService: AuthService, private router: Router) {
    this.location = location;
  }


  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    const user = localStorage.getItem('currentUser');
    this.currentUser = JSON.parse(user);
    this.previewUrl = `http://localhost:9090/img/${this.currentUser.avatar}`;
  }
  // getTitle(){
  //   var titlee = this.location.prepareExternalUrl(this.location.path());
  //   if(titlee.charAt(0) === '#'){
  //       titlee = titlee.slice( 1 );
  //   }

  //   for(var item = 0; item < this.listTitles.length; item++){
  //       if(this.listTitles[item].path === titlee){
  //           return this.listTitles[item].title;
  //       }
  //   }
  //   return 'Dashboard';
  // }
  signout() {
    console.log('signout button clicked');
    this.authService.logout();
  }
}
