import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Notificacion } from 'src/app/models/notifications.models';

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
    private router: Router
  ) {}

  ngOnInit(): void {
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

    console.log('=== CARGANDO NOTIFICACIONES ===');
    console.log('Usuario:', this.currentUser.codigo);
    
    this.notificationService.obtenerNotificacionesUsuario(this.currentUser.codigo)
      .subscribe({
        next: (data) => {
          console.log('Datos recibidos del backend:', data);
          console.log('Cantidad de notificaciones:', data.length);
          
          // Ordenar por fecha (más recientes primero)
          this.notificaciones = data.sort((a, b) => {
            return new Date(b.fecha).getTime() - new Date(a.fecha).getTime();
          });
          
          console.log('Notificaciones asignadas:', this.notificaciones);
        },
        error: (error) => {
          console.error('Error al cargar notificaciones:', error);
          console.error('Status:', error.status);
          console.error('Mensaje:', error.message);
        }
      });
  }

  esGlobal(notificacion: Notificacion): boolean {
    return !notificacion.usuario;
  }

  marcarComoLeida(notificacion: Notificacion): void {
    if (!this.currentUser?.codigo || notificacion.leida) {
      return; // No hay usuario o ya está leída
    }

    console.log('Marcando notificación como leída:', notificacion.id);
    
    this.notificationService.marcarComoLeida(notificacion.id, this.currentUser.codigo)
      .subscribe({
        next: (response) => {
          console.log('Notificación marcada como leída:', response);
          // Actualizar solo la notificación específica para este usuario
          notificacion.leida = true;
        },
        error: (error) => {
          console.error('Error al marcar como leída:', error);
          alert('No se pudo marcar la notificación como leída. Por favor, intente nuevamente.');
        }
      });
  }

  eliminarNotificacion(notificacion: Notificacion): void {
    if (!this.currentUser?.codigo) {
      return; // No hay usuario
    }

    if (confirm('¿Está seguro de que desea eliminar esta notificación?')) {
      console.log('Eliminando notificación:', notificacion.id);

      this.notificationService.eliminarNotificacion(notificacion.id, this.currentUser.codigo)
        .subscribe({
          next: () => {
            // eliminar la notificación de la lista local del usuario actual
            this.notificaciones = this.notificaciones.filter(n => n.id !== notificacion.id);
          },
          error: (error) => {
            console.error('Error al eliminar notificación:', error);
            alert('No se pudo eliminar la notificación. Por favor, intente nuevamente.');
          }
        });
    }
  }
  // crearNotificacion(notificacion: Notificacion): void {
  //   this.notificationService.crearNotificacion(notificacion)
  //     .subscribe({
  //       next: (response) => {
  //         console.log('Notificación creada:', response);
  //         this.notificaciones.unshift(response); // Agregar al inicio de la lista
  //       },
  //       error: (error) => {
  //         console.error('Error al crear notificación:', error);
  //         alert('No se pudo crear la notificación. Por favor, intente nuevamente.');
  //       }
  //     });
  // }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}