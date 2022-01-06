import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Operation } from './operation';
import { Account } from '../../account/account';
import { OperationType } from './operationtype';

@Injectable({
  providedIn: 'root'
})
export class OperationsService {
  
  public account: Account
  
  private baseUrl = 'http://localhost:8080/api/v1/operation'

  constructor(private httpClient: HttpClient) { }

  getOperations(): Observable<Operation[]>{
    return this.httpClient.get<Operation[]>(`${this.baseUrl}/${this.account.id}`)
  }

  createOperation(operation: Operation): Observable<Object>{
    return this.httpClient.post<Object>(`${this.baseUrl}`, operation)
  }

  getOperationTypes(): Observable<OperationType[]>{
    return this.httpClient.get<OperationType[]>(`${this.baseUrl}/types`)
  }
}
