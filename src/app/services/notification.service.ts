import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notificacion } from '../models/notifications.models';

// @Injectable({
//   providedIn: 'root'
// })
// export class NotificationService {
//   private apiUrl = 'http://localhost:8080/api/notificaciones';

//   constructor(private http: HttpClient) {}

//   obtenerNotificacionesUsuario(codigo: string): Observable<any[]> {
//     return this.http.get<any[]>(`${this.apiUrl}/usuarios/${codigo}/notificaciones`);
//   }
// }

interface Notification {
  id: number;
  message: string;
  date: Date;
  // ... other notification properties
}




@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = 'http://localhost:8080/api/notificaciones';

  constructor(private http: HttpClient) {}

  obtenerNotificacionesUsuario(codigo: string): Observable<Notificacion[]> {
    const url = this.apiUrl + '/usuarios/' + codigo + '/notificaciones';
    console.log('URL completa:', url);
    return this.http.get<Notificacion[]>(url);
  }

  obtenerNotificacionesGlobales(): Observable<Notificacion[]> {
    const url = this.apiUrl + '/notificaciones';
    return this.http.get<Notificacion[]>(url);
  }
  marcarComoLeida(id: number): Observable<Notificacion> {
  return this.http.put<Notificacion>(`${this.apiUrl}/notificaciones/${id}/leer`, {});
}
}