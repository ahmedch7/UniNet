import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Modele } from 'src/app/Models/modele';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModeleService {

  constructor(private httpClient:HttpClient) { }

  getById(id:number):Modele{
    let modele:Modele;
    this.httpClient.get<Modele>(`${environment.urlMicroServiceVoiture}/modeles/${id}`).subscribe(
      (response:Modele)=>{
        modele = response ;
      }
    )
    return modele ;
  }

  getAll():Modele[]{
    let modeles : Modele[];
    this.httpClient.get<Modele[]>(`${environment.urlMicroServiceVoiture}/modeles`).subscribe(
      (response:Modele[])=>{
        modeles = response ;
      }
    )
    return modeles ;
  }

  update(modele:Modele):Modele{
    let modeleUpdated:Modele ;
    this.httpClient.put<Modele>(`${environment.urlMicroServiceVoiture}/modeles`,modele).subscribe(
      (response:Modele)=>{
        modeleUpdated = response ;
      }
    )

    return modeleUpdated ;
  }

  deleteById(id:number){
    this.httpClient.delete(`${environment.urlMicroServiceVoiture}/modeles/${id}`).subscribe();
  }

}
