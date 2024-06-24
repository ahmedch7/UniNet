import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Marque } from 'src/app/Models/marque';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MarqueService {

  public marques=["Audi","Lamborghini","Bentley","Volswagen","Skoda","Seat","Bugatti","Nutzfahrzeuge"]

  constructor(private httpClient:HttpClient) { }

  getById(id:number):Marque{
    let marque : Marque ;
    this.httpClient.get<Marque>(`${environment.urlMicroServiceVoiture}/marques/${id}`).subscribe(
      (response)=>{
        marque = response ;
      }
    )
    return marque ;
  }


  getAll(){
    return this.httpClient.get<Marque[]>(`${environment.urlMicroServiceVoiture}/marques`,{headers:new HttpHeaders({
      'Authorization':`bearer ${localStorage.getItem('accessToken')}`
    })})
  }

  update(marque:Marque){
    this.httpClient.put<Marque>(`${environment.urlMicroServiceVoiture}/marques`,marque,{headers:new HttpHeaders({
      'Authorization':`bearer ${localStorage.getItem('accessToken')}`
    })}).subscribe();
  }

  deleteById(id:number){
    this.httpClient.delete(`${environment.urlMicroServiceVoiture}/marques/${id}`,{headers:new HttpHeaders({
      'Authorization':`bearer ${localStorage.getItem('accessToken')}`
    })}).subscribe();
  }
}
