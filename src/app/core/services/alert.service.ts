import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import  { Alert } from '../models/alert.model';
import { environment } from '../../../environments/environment';

export interface ApiResponse {
  message: string;
  alerts: Alert[]; // Aquí le decimos que existe una propiedad 'alerts' que es un array de Alert
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private http: HttpClient) { }

  sendAlert(alertData: Alert): Observable<any> {
    const apiUrl = `${environment.apiUrl}/alerts`; // Define la URL de tu API en environment.ts
    return this.http.post(apiUrl, alertData);
  }

  // Nuevo método para obtener todas las alertas
  getAlerts(): Observable<ApiResponse> {
    const apiUrl = `${environment.apiUrl}/alerts`;
    return this.http.get<any>(apiUrl); 
  }

}
