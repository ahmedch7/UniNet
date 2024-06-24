import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VoitureService } from 'src/app/services/voitureService/voiture/voiture.service';
import { MarqueService } from 'src/app/services/voitureService/marque/marque.service';
import { Marque } from 'src/app/Models/marque';
import { Voiture } from 'src/app/Models/voiture';


@Component({
  selector: 'app-update-voiture',
  templateUrl: './update-voiture.component.html',
  styleUrls: ['./update-voiture.component.scss']
})
export class UpdateVoitureComponent implements OnInit {


  updateVoiture: FormGroup
  selectedValue:any;
  marques:Marque[];
  voitureId:any;
  voiture:any ;

  constructor(private _formBuilder:FormBuilder,private _voitureService:VoitureService,private _marqueService:MarqueService,private _router:Router,private _activatedRoute:ActivatedRoute) {
    this._marqueService.getAll().subscribe(
      data=>{this.marques=data;
            //  console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",this.marques)
      }
    );
    this.voitureId = this._activatedRoute.snapshot.paramMap.get("id");
    // console.log("id",this.voitureId)
     this._voitureService.getById(this.voitureId).subscribe(
      (data:Voiture)=> {
        this.voiture = data ;
        // console.log(this.voiture);
        this.updateVoiture = this._formBuilder.group({
          kilometrageDto:[this.voiture.kilometrageDto,Validators.required],
          numChassisDto:[this.voiture.numChassisDto,Validators.required],
          matriculeDto:[this.voiture.matriculeDto,Validators.required],
          AnneeDto:[this.voiture.AnneeDto,Validators.required],
         // marqueDto:[]
        })
        
      }
    );
   }

  searchMarque(){

  }
  ngOnInit(): void {
    

    
  }


  mettreAJour(){
    this._voitureService.update(
      {
        ...this.voiture,
        ...this.updateVoiture.value,
      }
    ).subscribe(
    ()=>
    this._router.navigate(["/voitures"])

    )
  }

  cancel(){
    this._router.navigate(["/"]);
  }

}
