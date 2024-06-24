import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Voiture } from 'src/app/Models/voiture';
import { PreOrdreService } from 'src/app/services/ordreService/pre-ordre.service';
import { UserService } from 'src/app/services/user/user.service';
import { VoitureService } from 'src/app/services/voitureService/voiture/voiture.service';


@Component({
  selector: 'app-voitures',
  templateUrl: './voitures.component.html',
  styleUrls: ['./voitures.component.scss']
})
export class VoituresComponent implements OnInit {
  displayedColumns: string[] = ['modeleDto', 'matriculeDto', 'kilometrageDto', 'numChassisDto', "marqueDto", "action"];
  dataSource: Voiture[];

  user: any;
  constructor(private _userService: UserService, private _voitureService: VoitureService, private _router: Router) { 
    this._userService.getUser().subscribe(
      (data: Voiture[]) => {
        this.user = data;
      }
    );
    this._voitureService.getAllByIdUser(this.user.id).subscribe(
      (data: any[]) => {
        this.dataSource = data;
      }
    )
  }

  ngOnInit(): void {
  }

  updateVoiture(id: any) {
    this._router.navigate([`/update-voiture/${id}`])
  }

  addVoiture() {
    this._router.navigate([`/add-voiture`])
  }

  takeAppoinement(id: any) {
    this._router.navigate([`/appointment/${id}`])
  }

  delete(id) {
    this._voitureService.deleteById(id).subscribe(
      () => {
        this._voitureService.getAllByIdUser(this.user.id).subscribe(
          (data: any[]) => {
            this.dataSource = data;
          })
        }
    );
  }
  getPreodres(id:any){this._router.navigate([`preodre/${id}`])}

}
