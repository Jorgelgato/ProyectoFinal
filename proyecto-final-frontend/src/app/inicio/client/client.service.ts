import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from './client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private baseUrl = 'http://localhost:8080/api/v1/client'

  constructor(private httpClient: HttpClient) { }

  getClient(): Observable<Client>{
    return this.httpClient.get<Client>(`${this.baseUrl}/${localStorage.getItem('id')}`)
  }

  createClient(client: Client): Observable<Object>{
    return this.httpClient.post<Object>(`${this.baseUrl}`, client)
  }

  loginClient(client: Client): Observable<any>{
    return this.httpClient.post<Object>(`${this.baseUrl}/login`, client)
  }

  updateClient(client: Client): Observable<Client>{
    return this.httpClient.put<Client>(`${this.baseUrl}/${localStorage.getItem('id')}`, client)
  }

}
