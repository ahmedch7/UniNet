import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isConnected:Boolean=false;
  isAdmin:Boolean=false;
  user:any;
  constructor(private _userService:UserService,private _router:Router) { 
    
  }

  ngOnInit(): void {
    this._userService.getUser().subscribe(
      (data:any)=>{
        console.log(data)
        if(data!=null){
          this.user=data;
          console.log(data)
        }
      }
    );
    this._userService.getIsConnected().subscribe(
      (data:Boolean)=>{
        this.isConnected = data ;
      }
    )
    this._userService.getIsAdmin().subscribe(
      (data:Boolean)=>{
        this.isAdmin = data ;
      }
    )
  }

  onClickLogout(){
    this.isConnected=false;
    this.isAdmin=false;
    this._userService.logout();
    this._router.navigate(['/'])
  }

}
