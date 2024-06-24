import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PanneService {

  constructor(private httpClient:HttpClient) { }

  getAll(){
    return this.httpClient.get(`http://localhost:9000/ORDRE-SERVICE/services`,{headers:new HttpHeaders({
      'Authorization':`bearer ${localStorage.getItem('accessToken')}`
    })});
  }

}
