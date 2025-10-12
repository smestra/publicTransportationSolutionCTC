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
  notificaciones: any[] = [];

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtener usuario actual
    this.currentUser = this.authService.getCurrentUser();
    
    if (!this.currentUser) {
      this.router.navigate(['/login']);
      return;
    }

    // Cargar notificaciones
    this.cargarNotificaciones();
  }

  // cargarNotificaciones(): void {
  //   console.log('Cargando notificaciones para el usuario:', this.currentUser.codigo);
  //   this.notificationService.obtenerNotificacionesUsuario(this.currentUser.codigo)
  //     .subscribe({
  //       next: (data) => {
  //         this.notificaciones = data;
  //         console.log('Notificaciones recibidas:', this.notificaciones);
  //       },
  //       error: (error) => {
  //         console.error('Error al cargar notificaciones:', error);
  //       }
  //     });
  // }

  // esGlobal(notificacion: any): boolean {
  //   return !notificacion.usuario;
  // }
  cargarNotificaciones(): void {
  if (!this.currentUser?.codigo) {
    console.error('No hay usuario autenticado');
    return;
  }

  console.log('Cargando notificaciones para el usuario:', this.currentUser.codigo);
  
  this.notificationService.obtenerNotificacionesUsuario(this.currentUser.codigo)
    .subscribe(
      (data) => {
        this.notificaciones = data;
        console.log('Notificaciones recibidas:', this.notificaciones);
      },
      (error) => {
        console.error('Error al cargar notificaciones:', error);
      }
    );
}

esGlobal(notificacion: Notificacion): boolean {
  return !notificacion.usuario;
}
marcarComoLeida(notificacion: Notificacion): void {
  this.notificationService.marcarComoLeida(notificacion.id)
    .subscribe(
      (response) => {
        console.log('Notificación marcada como leída');
        // Actualizar la notificación en el array local
        const notif = this.notificaciones.find(n => n.id === notificacion.id);
        if (notif) {
          notif.leida = true;
        }
      },
      (error) => {
        console.error('Error al marcar como leída:', error);
      }
    );
}
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}