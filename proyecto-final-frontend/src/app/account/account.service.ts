import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from './account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private baseUrl = 'http://localhost:8080/api/v1/account'

  constructor(private httpClient: HttpClient) { }

  getAccountList(): Observable<Account[]>{
    return this.httpClient.get<Account[]>(`${this.baseUrl}/${localStorage.getItem('id')}`,)
  }

  createAccount(account: Account): Observable<Object>{
    return this.httpClient.post<Object>(`${this.baseUrl}`, account)
  }

}
