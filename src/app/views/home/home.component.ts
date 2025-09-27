import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RouteService, RouteStep } from '../../services/route.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  currentUser: any = null;
  routeSteps: RouteStep[] = [];
  private routeSubscription?: Subscription;

  constructor(
    private authService: AuthService,
    private routeService: RouteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtener información del usuario actual
    this.currentUser = this.authService.getCurrentUser();
    if (!this.currentUser) {
      this.router.navigate(['/login']);
      return;
    }

    // Suscribirse a las actualizaciones de la ruta
    this.routeSubscription = this.routeService.getCurrentRoute().subscribe({
      next: (steps) => {
        this.routeSteps = steps;
      },
      error: (error) => {
        console.error('Error al obtener la ruta:', error);
      }
    });
  }

  ngOnDestroy(): void {
    // Cancelar la suscripción cuando el componente se destruye
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}