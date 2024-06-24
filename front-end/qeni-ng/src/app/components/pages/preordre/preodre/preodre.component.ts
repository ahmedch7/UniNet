import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PreOrdreService } from 'src/app/services/ordreService/pre-ordre.service';

@Component({
  selector: 'app-preodre',
  templateUrl: './preodre.component.html',
  styleUrls: ['./preodre.component.scss']
})
export class PreodreComponent implements OnInit {
  displayedColumns: string[] = ['modeleDto', 'matriculeDto', 'kilometrageDto', 'numChassisDto','dateRDVDto',"marqueDto","action"];
  dataSource : any[];
  idVoiture:any;
  constructor( private _preodreService:PreOrdreService,private _activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.idVoiture = this._activatedRoute.snapshot.paramMap.get("id")
    this._preodreService.getAllByIdVoiture(this.idVoiture).subscribe(
      (data:any[])=>{
        this.dataSource=data
        console.log(data)
      }
    )
  }
  validate(id:any){
    this._preodreService.confirmationFinal(id).subscribe(
      ()=>this.ngOnInit()
    )
  }
  delete(id:any){
    console.log(id)
    this._preodreService.deletePreordre(id).subscribe(
      ()=>this.ngOnInit()
    )
  }

}
