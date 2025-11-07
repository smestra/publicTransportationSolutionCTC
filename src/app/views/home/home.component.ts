import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Notificacion, NotificacionRequest } from 'src/app/models/notifications.models';
import { RutaService } from 'src/app/services/route.service';
import { Ruta } from 'src/app/models/rutas.models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: any = null;
  notificaciones: Notificacion[] = [];


  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private rutaService: RutaService,
    private router: Router
  ) {}
  ngOnInit(): void {
    console.log('ngOnInit ejecutándose');
    this.currentUser = this.authService.getCurrentUser();
    
    if (!this.currentUser) {
      this.router.navigate(['/login']);
      return;
    }

    this.cargarNotificaciones();
  }

  cargarNotificaciones(): void {
    if (!this.currentUser?.codigo) {
      console.error('No hay usuario autenticado');
      return;
    }

    console.log('Cargando notificaciones para:', this.currentUser.codigo);
    
    this.notificationService.obtenerNotificacionesUsuario(this.currentUser.codigo)
      .subscribe({
        next: (data) => {
          console.log('Notificaciones recibidas:', data.length);
          this.notificaciones = data.sort((a, b) => {
            return new Date(b.fecha).getTime() - new Date(a.fecha).getTime();
          });
        },
        error: (error) => {
          console.error('Error al cargar notificaciones:', error);
        }
      });
  }


  esGlobal(notificacion: Notificacion): boolean {
    return !notificacion.usuario;
  }

  marcarComoLeida(notificacion: Notificacion): void {
    if (!this.currentUser?.codigo || notificacion.leida) {
      return;
    }
    
    this.notificationService.marcarComoLeida(notificacion.id, this.currentUser.codigo)
      .subscribe({
        next: () => {
          notificacion.leida = true;
        },
        error: (error) => {
          console.error('Error al marcar como leída:', error);
        }
      });
  }

  eliminarNotificacion(notificacion: Notificacion): void {
    if (!this.currentUser?.codigo) return;

    if (confirm('¿Eliminar esta notificación?')) {
      this.notificationService.eliminarNotificacion(notificacion.id, this.currentUser.codigo)
        .subscribe({
          next: () => {
            this.notificaciones = this.notificaciones.filter(n => n.id !== notificacion.id);
          },
          error: (error) => {
            console.error('Error al eliminar:', error);
          }
        });
    }
  }
  
  irACrearNotificacion(): void {
    this.router.navigate(['/crear-notificacion']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}