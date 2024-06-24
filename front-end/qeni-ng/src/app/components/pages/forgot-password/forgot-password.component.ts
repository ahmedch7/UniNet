import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup
  constructor(private _formBuilder:FormBuilder,private _userService:UserService) { }

  ngOnInit(): void {
    this.forgotPasswordForm = this._formBuilder.group({
      username:['',[Validators.email,Validators.required]],
    })
  }

  forgotPassword(){
    this._userService.forgotPassword(this.forgotPasswordForm.value.username)
  }
  annuler(){}

}
