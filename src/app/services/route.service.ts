import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

export interface RouteStep {
  time: string;
  location: string;
  status: string;
  current: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  private apiUrl = 'http://localhost:8080/api';
  private routeSubject = new BehaviorSubject<RouteStep[]>([]);
  private mockData: RouteStep[] = [
    {
      time: '06:30',
      location: 'Punto de Inicio - Terminal',
      status: 'Pendiente',
      current: false
    },
    {
      time: '06:45',
      location: 'Parada 1 - Centro Comercial',
      status: 'Pendiente',
      current: false
    },
    {
      time: '07:00',
      location: 'Parada 2 - Parque Principal',
      status: 'Pendiente',
      current: false
    },
    {
      time: '07:15',
      location: 'Parada 3 - Biblioteca',
      status: 'Pendiente',
      current: false
    },
    {
      time: '07:30',
      location: 'Universidad',
      status: 'Pendiente',
      current: false
    }
  ];

  constructor(private http: HttpClient) {
    // Inicializar con datos mock
    this.routeSubject.next(this.mockData);
    
    // Actualizar cada minuto
    setInterval(() => this.updateRouteStatus(), 60000);
  }

  getCurrentRoute(): Observable<RouteStep[]> {
    return this.routeSubject.asObservable();
  }

  getUserRoute(): Observable<RouteStep[]> {
    return this.http.get<RouteStep[]>(`${this.apiUrl}/route/user`);
  }

  private updateRouteStatus(): void {
    const now = new Date();
    let foundCurrent = false;
    
    const updatedSteps = this.mockData.map(step => {
      const stepTime = new Date();
      const [hours, minutes] = step.time.split(':');
      stepTime.setHours(parseInt(hours), parseInt(minutes), 0);

      if (stepTime < now && !foundCurrent) {
        return { ...step, status: 'Completado', current: false };
      } 
      else if (stepTime >= now && !foundCurrent) {
        foundCurrent = true;
        return { ...step, status: 'En proceso', current: true };
      }
      return { ...step, status: 'Pendiente', current: false };
    });

    this.routeSubject.next(updatedSteps);
  }
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
  }
}