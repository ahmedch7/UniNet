import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Voiture } from 'src/app/Models/voiture';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VoitureService {

  constructor(private httpClient : HttpClient) { }

  getById(id:any){
    return this.httpClient.get(`${environment.urlMicroServiceVoiture}/voitures/${id}`,{headers:new HttpHeaders({
      'Authorization':`bearer ${localStorage.getItem('accessToken')}`
    })})
  }

  getAll():Voiture[]{
    let voitures : Voiture[];
    this.httpClient.get<Voiture[]>(`${environment.urlMicroServiceVoiture}/voitures`,{headers:new HttpHeaders({
      'Authorization':`bearer ${localStorage.getItem('accessToken')}`
    })}).subscribe(
      (response:Voiture[])=>{
        voitures = response ;
      }
    )
    return voitures ;
  }

  update(voiture:any){
    return this.httpClient.put(`${environment.urlMicroServiceVoiture}/voitures`,voiture,{headers:new HttpHeaders({
      'Authorization':`bearer ${localStorage.getItem('accessToken')}`
    })})
  }

  deleteById(id:any){
    return this.httpClient.delete(`${environment.urlMicroServiceVoiture}/voitures/${id}`,{headers:new HttpHeaders({
      'Authorization':`bearer ${localStorage.getItem('accessToken')}`
    })});
  }

  getAllByIdUser(id:any){
    return this.httpClient.get(`http://localhost:9000/VOITURE-SERVICE/voitures/getByIdClient/${id}`,{headers:new HttpHeaders({
      'Authorization':`bearer ${localStorage.getItem('accessToken')}`
    })});
  }

  addVoiture(voiture){
    return this.httpClient.post(`${environment.urlMicroServiceVoiture}/voitures`,voiture,{headers:new HttpHeaders({
      'Authorization':`bearer ${localStorage.getItem('accessToken')}`
    })})
  }
}
