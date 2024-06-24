import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PanneService } from 'src/app/services/ordreService/panne.service';
import { PreOrdreService } from 'src/app/services/ordreService/pre-ordre.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {
  pannes: any[];
  makeAppoinementForm: FormGroup
  constructor(private _formBuilder: FormBuilder, private _preOrdreService: PreOrdreService, private _router: Router,private _activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this._activatedRoute.snapshot.paramMap.get("id"));
    this.makeAppoinementForm = this._formBuilder.group({
      idVoitureDto:[this._activatedRoute.snapshot.paramMap.get("id")],
      dateRDVDto: ['', [Validators.required]],
      kilometrageDto: ['', Validators.required],
      descriptionDto: ['', Validators.required],
    })
  }

  makeAppoinement() {
    // console.log(this.signInForm.value);
    this._preOrdreService.create(this.makeAppoinementForm.value).subscribe(
      (response: any) => {
        console.log("mcheeet", response);
        this._router.navigate(['/voitures'])

      }
    )
  }

  backToHome(){
    this._router.navigate(["/voitures"]);
  }
}


