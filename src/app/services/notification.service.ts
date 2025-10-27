import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notificacion } from '../models/notifications.models';

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

  // crearNotificacion(mensaje: string, rutaId: number, usuarioCodigo?: string): Observable<Notificacion> {
  //   const notificacion: Notificacion = {
  //     id: 0,
  //     mensaje,
  //     ruta: Number(rutaId),
  //     leida: false,
  //     fecha: String(new Date()),
  //     usuarioCodigo: usuarioCodigo
  //   };
  //   return this.http.post<Notificacion>(this.apiUrl, notificacion);
  // }
}

