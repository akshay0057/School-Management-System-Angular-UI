import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DashboardResponse } from '../models/response/dashboard.response';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { ApiResponse } from '../models/response/api-response';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) {}

  getDashboardData(): Observable<ApiResponse<DashboardResponse>> {
    return this.http.get<ApiResponse<DashboardResponse>>(
      `${environment.apiUrl}/dashboard/summary`
    );
  }
}
