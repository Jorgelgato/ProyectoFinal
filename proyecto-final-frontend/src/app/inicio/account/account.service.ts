import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from './account';
import { AccountType } from './accounttype';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private baseUrl = 'http://localhost:8080/api/v1/account'

  constructor(private httpClient: HttpClient) { }

  getClientAccountList(): Observable<Account[]>{
    return this.httpClient.get<Account[]>(`${this.baseUrl}/client/${localStorage.getItem('id')}`,)
  }

  createAccount(account: Account): Observable<Object>{
    return this.httpClient.post<Object>(`${this.baseUrl}`, account)
  }

  accountAddAmount(id: number, amount: number): Observable<Object>{
    var account: Account = new Account();
    account.id = id;
    account.amount = amount;
    return this.httpClient.put<Object>(`${this.baseUrl}/add`, account)
  }

  accountSubtractAmount(id: number, amount: number): Observable<Object>{
    var account: Account = new Account();
    account.id = id;
    account.amount = amount;
    return this.httpClient.put<Object>(`${this.baseUrl}/subtract`, account)
  }

  cancelAccount(account: Account): Observable<Object>{
    account.status = 2;
    return this.httpClient.put<Object>(`${this.baseUrl}/status`, account)
  }

  toggleAccount(account: Account): Observable<Object>{
    account.status = account.status ? 0 : 1
    return this.httpClient.put<Object>(`${this.baseUrl}/status`, account)
  }

  getAccountTypes(): Observable<AccountType[]>{
    return this.httpClient.get<AccountType[]>(`${this.baseUrl}/types`)
  }

}