import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from './client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private baseUrl = 'http://localhost:8080/api/v1/clients'

  constructor(private httpClient: HttpClient) { }

  getClientList(): Observable<Client[]>{
    return this.httpClient.get<Client[]>(`${this.baseUrl}`)
  }

  createClient(client: Client): Observable<Object>{
    return this.httpClient.post<Object>(`${this.baseUrl}`, client)
  }

  loginClient(client: Client): Observable<Object>{
    return this.httpClient.post<Object>(`${this.baseUrl}/login`, client)
  }
}
