import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PreOrdreService } from 'src/app/services/ordreService/pre-ordre.service';
import { UserService } from 'src/app/services/user/user.service';
import { VoitureService } from 'src/app/services/voitureService/voiture/voiture.service';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.scss']
})
export class DashbordComponent implements OnInit {

  displayedColumns: string[] = ['modeleDto', 'matriculeDto', 'kilometrageDto', 'numChassisDto','dateRDVDto',"marqueDto","action"];
  dataSource : any[];

  constructor(private _preordresService:PreOrdreService,private _router:Router) { }

  ngOnInit(): void {
    this._preordresService.getAll().subscribe(
      (data:any[])=>{
        this.dataSource=data
        console.log(data)
      }
    )
  }

  validate(id:any){
    this._preordresService.confirmRdvReceptionniste(id).subscribe(
      ()=>this.ngOnInit()
    )
  }

  delete(id:any){
    console.log(id)
    this._preordresService.deletePreordre(id).subscribe(
      ()=>this.ngOnInit()
    )
  };
}


