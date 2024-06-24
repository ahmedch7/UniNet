import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  id:any;
  resetPasswordForm: FormGroup
  constructor(private _formBuilder:FormBuilder,private _userService:UserService,private _activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.id= this._activatedRoute.snapshot.paramMap.get("id")
    this.resetPasswordForm = this._formBuilder.group({
      currentPassword:['',[,Validators.required]],
      newPassword:['',[Validators.required]]
    })
  }

  resetPassword(){
    this._userService.resetPassword(this.resetPasswordForm.value,this.id)
  }
  annuler(){}


}
