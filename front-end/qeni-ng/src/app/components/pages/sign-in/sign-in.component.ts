import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  signInForm: FormGroup
  constructor(private _formBuilder:FormBuilder,private _userService:UserService,private _router:Router) { }

  ngOnInit(): void {
    this.signInForm = this._formBuilder.group({
      username:['',[Validators.email,Validators.required]],
      password:['',Validators.required]
    })
  }

  signIn(){
    // console.log(this.signInForm.value);
    this._userService.signIn(this.signInForm.value).subscribe(
      ()=>{
        this._router.navigate(['/home'])
      }
    )
  }

}
