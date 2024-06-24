import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup
  constructor(private _formBuilder:FormBuilder,private _userService:UserService,private _router:Router) { }

  ngOnInit(): void {
    this.signUpForm = this._formBuilder.group({
      email:['',[Validators.email,Validators.required]],
      password:['',Validators.required],
      name:['',Validators.required],
      lastName:['',Validators.required]
    })
  }

  signUp(){
    this._userService.createAccount(this.signUpForm.value)
  }

}
