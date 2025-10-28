// src/app/views/crear-notificacion/crear-notificacion.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { RutaService } from '../../services/route.service';
import { NotificacionRequest } from '../../models/notifications.models';
import { Ruta } from '../../models/rutas.models';

@Component({
  selector: 'app-crear-notificacion',
  templateUrl: './crear-notificacion.component.html',
  styleUrls: ['./crear-notificacion.component.css']
})
export class CrearNotificacionComponent implements OnInit {
  currentUser: any = null;
  rutas: Ruta[] = [];
  loading: boolean = false;

  // Datos del formulario
  formulario = {
    mensaje: '',
    rutaId: null as number | null,
    tipo: 'global' as 'global' | 'personal',
    codigoUsuario: ''
  };

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private rutaService: RutaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    
    if (!this.currentUser) {
      this.router.navigate(['/login']);
      return;
    }

    this.cargarRutas();
  }
getRutaNombre(rutaId: number): string {
    return this.rutas.find(r => r.id === rutaId)?.nombre || '';
  }
  cargarRutas(): void {
    this.rutaService.obtenerTodasLasRutas().subscribe({
      next: (rutas) => {
        this.rutas = rutas;
        console.log('Rutas cargadas:', rutas.length);
      },
      error: (error) => {
        console.error('Error al cargar rutas:', error);
        alert('Error al cargar las rutas disponibles');
      }
    });
  }

  crearNotificacion(): void {
    // Validaciones
    if (!this.formulario.mensaje.trim()) {
      alert('El mensaje es requerido');
      return;
    }

    if (!this.formulario.rutaId) {
      alert('Debes seleccionar una ruta');
      return;
    }

    if (this.formulario.tipo === 'personal' && !this.formulario.codigoUsuario.trim()) {
      alert('Para notificaciones personales debes ingresar el código del usuario');
      return;
    }

    // Crear request
    const request: NotificacionRequest = {
      mensaje: this.formulario.mensaje,
      rutaId: this.formulario.rutaId
    };

    if (this.formulario.tipo === 'personal') {
      request.usuarioCodigo = this.formulario.codigoUsuario;
    }

    console.log('Creando notificación:', request);
    this.loading = true;

    // Enviar al backend
    this.notificationService.crearNotificacion(request).subscribe({
      next: (notificacion) => {
        this.loading = false;
        console.log('Notificación creada exitosamente:', notificacion);
        alert('✓ Notificación creada exitosamente');
        this.volverAlHome();
      },
      error: (error) => {
        this.loading = false;
        console.error('Error al crear notificación:', error);
        alert('✗ Error al crear notificación: ' + (error.error || error.message || 'Error desconocido'));
      }
    });
  }

  limpiarFormulario(): void {
    this.formulario = {
      mensaje: '',
      rutaId: null,
      tipo: 'global',
      codigoUsuario: ''
    };
  }

  volverAlHome(): void {
    this.router.navigate(['/home']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}