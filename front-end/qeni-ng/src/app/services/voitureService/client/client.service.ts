import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from 'src/app/Models/client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  client : Client

  constructor(private httpClient:HttpClient) { }

  getById(id:number):Client
  {
    this.httpClient.get<Client>(`${environment.urlMicroServiceVoiture}/clients/${id}`).subscribe(
      (response:Client)=>{
        this.client=response;
      }
    )
    return this.client;
  }

  getAll():Client[]
  {
    let client : Client[] ;
    this.httpClient.get<Client[]>(`${environment.urlMicroServiceVoiture}/clients`).subscribe(
      (response:Client[])=>{
        client = response
      }
    )
    return client;

  }

  update(client:Client){
    this.httpClient.put<Client>(`${environment.urlMicroServiceVoiture}/clients`,client).subscribe(
      (response:Client)=>{
        this.client = response ;
      }
    );
  }

  delete(id:number){
    this.httpClient.delete(`${environment.urlMicroServiceVoiture}/clients/${id}`).subscribe();
  }
}
