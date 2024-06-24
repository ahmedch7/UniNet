import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Marque } from 'src/app/Models/marque';
import { UserService } from 'src/app/services/user/user.service';
import { MarqueService } from 'src/app/services/voitureService/marque/marque.service';
import { VoitureService } from 'src/app/services/voitureService/voiture/voiture.service';

@Component({
  selector: 'app-add-voiture',
  templateUrl: './add-voiture.component.html',
  styleUrls: ['./add-voiture.component.scss']
})
export class AddVoitureComponent implements OnInit {
  

  updateVoiture: FormGroup
  user:any;
  selectedValue:any;
  marques:string[];
  voitureId:any;
  voiture:any ;
  marqueUpdated:any;

  constructor(private _userService:UserService, private _formBuilder:FormBuilder,private _voitureService:VoitureService,private _marqueService:MarqueService,private _router:Router) { }

  ngOnInit(): void {
    this._userService.getUser().subscribe(
      (data)=>this.user=data
      )
    this.marques = this._marqueService.marques;
    this.updateVoiture = this._formBuilder.group({
      kilometrageDto:['',Validators.required],
      numChassisDto:['',Validators.required],
      matriculeDto:['',Validators.required],
      AnneeDto:['',Validators.required],
      modeleDto:['',Validators.required],
      marqueDto:['',Validators.required]
    })

  }

  add(){
    console.log("useeer",this.user)
    let voitureToAdd={
      ...this.updateVoiture.value,
      idClient:this.user.id,
    }
    console.log("voitureeee",this.updateVoiture.get("marqueDto"))
    this._voitureService.addVoiture(voitureToAdd).subscribe(
    ()=>
    this._router.navigate(["/voitures"])

    )
  }

  cancel(){
    this._router.navigate(["/"]);
  }

}
