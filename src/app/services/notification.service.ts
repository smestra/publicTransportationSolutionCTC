import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notificacion, NotificacionRequest } from '../models/notifications.models';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = 'http://localhost:8080/api/notificaciones';

  constructor(private http: HttpClient) {}

  obtenerNotificacionesUsuario(codigo: string): Observable<Notificacion[]> {
    const url = `${this.apiUrl}/usuarios/${codigo}/notificaciones`;
    console.log('URL completa:', url);
    return this.http.get<Notificacion[]>(url);
  }

  obtenerNotificacionesGlobales(): Observable<Notificacion[]> {
    return this.http.get<Notificacion[]>(this.apiUrl);
  }

  marcarComoLeida(id: number, codigoUsuario: string): Observable<Notificacion> {
    return this.http.put<Notificacion>(`${this.apiUrl}/${id}/leer`, { codigoUsuario });
  }

  eliminarNotificacion(id: number, codigoUsuario: string): Observable<Notificacion> {
    // Enviamos el código de usuario como parámetro de consulta
    return this.http.delete<Notificacion>(`${this.apiUrl}/${id}`, {
      params: { codigoUsuario }
    });
  }
  crearNotificacion(request: NotificacionRequest):Observable<Notificacion> { return this.http.post<Notificacion>(this.apiUrl, request);
}
}
