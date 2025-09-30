import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, interval } from 'rxjs';
import { switchMap, catchError, tap } from 'rxjs/operators';
import { Notificacion, NotificacionRequest } from '../models/notificacion.models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

 private apiUrl = `${environment.apiUrl}/notificaciones`;
  private notificacionesSubject = new BehaviorSubject<Notificacion[]>([]);
  public notificaciones$ = this.notificacionesSubject.asObservable();
  
  private notificacionesNoLeidasSubject = new BehaviorSubject<number>(0);
  public notificacionesNoLeidas$ = this.notificacionesNoLeidasSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Crear notificación
  crearNotificacion(request: NotificacionRequest): Observable<Notificacion> {
    return this.http.post<Notificacion>(this.apiUrl, request);
  }

  // Obtener notificaciones globales
  obtenerNotificacionesGlobales(): Observable<Notificacion[]> {
    return this.http.get<Notificacion[]>(this.apiUrl);
  }

  // Obtener notificaciones de usuario (globales + personalizadas)
  obtenerNotificacionesUsuario(codigo: string): Observable<Notificacion[]> {
    return this.http.get<Notificacion[]>(`${this.apiUrl}/usuarios/${codigo}/notificaciones`)
      .pipe(
        tap(notificaciones => {
          this.notificacionesSubject.next(notificaciones);
          const noLeidas = notificaciones.filter(n => !n.leida).length;
          this.notificacionesNoLeidasSubject.next(noLeidas);
        })
      );
  }

  // Marcar notificación como leída
  marcarComoLeida(id: number): Observable<Notificacion> {
    return this.http.put<Notificacion>(`${this.apiUrl}/${id}/leer`, {})
      .pipe(
        tap(() => {
          // Actualizar el contador de no leídas
          const notificaciones = this.notificacionesSubject.value;
          const notificacionesActualizadas = notificaciones.map(n => 
            n.id === id ? { ...n, leida: true } : n
          );
          this.notificacionesSubject.next(notificacionesActualizadas);
          
          const noLeidas = notificacionesActualizadas.filter(n => !n.leida).length;
          this.notificacionesNoLeidasSubject.next(noLeidas);
        })
      );
  }

  // Eliminar notificación
  eliminarNotificacion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(
        tap(() => {
          const notificaciones = this.notificacionesSubject.value.filter(n => n.id !== id);
          this.notificacionesSubject.next(notificaciones);
          const noLeidas = notificaciones.filter(n => !n.leida).length;
          this.notificacionesNoLeidasSubject.next(noLeidas);
        })
      );
  }

  // Iniciar polling para actualizar notificaciones automáticamente
  iniciarPolling(codigoUsuario: string, intervaloMs: number = 30000): void {
    interval(intervaloMs)
      .pipe(
        switchMap(() => this.obtenerNotificacionesUsuario(codigoUsuario)),
        catchError(error => {
          console.error('Error en polling de notificaciones:', error);
          return [];
        })
      )
      .subscribe();
  }

  // Detener el polling
  detenerPolling(): void {
    this.notificacionesSubject.next([]);
    this.notificacionesNoLeidasSubject.next(0);
  }

  // Obtener notificaciones actuales sin hacer petición HTTP
  obtenerNotificacionesActuales(): Notificacion[] {
    return this.notificacionesSubject.value;
  }
}