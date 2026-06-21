import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/request/login.request';
import { LoginResponse } from '../models/response/login.response';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { ApiResponse } from '../models/response/api-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  login(request: LoginRequest): Observable<ApiResponse<LoginResponse>> {
    return this.http.post<ApiResponse<LoginResponse>>(
      `${environment.apiUrl}/auth/login`,
      request
    );
  }

  saveToken(token: string){
    localStorage.setItem("token", token);
  }

  saveUserClaims(userName: string, roles: string[]){
    localStorage.setItem("userName", userName);
    localStorage.setItem("roles", JSON.stringify(roles));
  }

  logout() {
    localStorage.clear();
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }


  getProfile() {
    return this.http.get(
      `${environment.apiUrl}/auth/profile`
    );
  }
}
