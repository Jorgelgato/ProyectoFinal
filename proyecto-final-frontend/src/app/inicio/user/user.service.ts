import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8080/api/v1/user'

  constructor(private httpClient: HttpClient) { }

  getUser(): Observable<User>{
    return this.httpClient.get<User>(`${this.baseUrl}/${localStorage.getItem('id')}`)
  }

  createUser(user: User): Observable<Object>{
    return this.httpClient.post<Object>(`${this.baseUrl}`, user)
  }

  loginUser(user: User): Observable<any>{
    return this.httpClient.post<Object>(`${this.baseUrl}/login`, user)
  }

  updateUser(user: User): Observable<User>{
    return this.httpClient.put<User>(`${this.baseUrl}/${localStorage.getItem('id')}`, user)
  }

  deleteUser(user: User): Observable<User>{
    user.active = false;
    return this.httpClient.put<User>(`${this.baseUrl}/${localStorage.getItem('id')}`, user)
  }
}
