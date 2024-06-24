import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PreOrdreService {


  constructor(private httpClient:HttpClient) { }

  create(preOdre:any){
    return this.httpClient.post(`http://localhost:9000/ORDRE-SERVICE/preordres`,preOdre,{headers:new HttpHeaders({
      'Authorization':`bearer ${localStorage.getItem('accessToken')}`
    })});
  }
  getAll(){
    return this.httpClient.get(`http://localhost:9000/ORDRE-SERVICE/preordres`,{headers:new HttpHeaders({
      'Authorization':`bearer ${localStorage.getItem('accessToken')}`
    })});
  }
  getAllByIdVoiture(id:any){
      return this.httpClient.get(`http://localhost:9000/ORDRE-SERVICE/getAllByIdVoiture/${id}`,{headers:new HttpHeaders({
      'Authorization':`bearer ${localStorage.getItem('accessToken')}`
    })})
  }
  confirmRdvReceptionniste(id:any){
    return this.httpClient.post(`http://localhost:9000/ORDRE-SERVICE/preodres/confirmRDV/${id}`,5155515,{headers:new HttpHeaders({
      'Authorization':`bearer ${localStorage.getItem('accessToken')}`
    })})
  }
  deletePreordre(id:any){
    return this.httpClient.delete(`http://localhost:9000/ORDRE-SERVICE/preordres/${id}`,{headers:new HttpHeaders({
      'Authorization':`bearer ${localStorage.getItem('accessToken')}`
    })})
  }
  confirmationFinal(id:any){
    return this.httpClient.post(`http://localhost:9000/ORDRE-SERVICE/preordres/confirmRDVReceptionniste/${id}`,null,{headers:new HttpHeaders({
      'Authorization':`bearer ${localStorage.getItem('accessToken')}`
    })})
  }
  
}
