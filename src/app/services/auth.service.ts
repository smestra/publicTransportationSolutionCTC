import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface LoginRequest {
  codigo: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  codigo: string;
  nombre: string;
  carrera: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api';
  private currentUserSubject = new BehaviorSubject<LoginResponse | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  
  constructor(private http: HttpClient) {
    // Verificar si hay token almacenado al inicializar
    this.checkStoredToken();
  }

  login(codigo: string, password: string): Observable<LoginResponse> {
    const loginData: LoginRequest = { codigo, password };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    };

    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, loginData, httpOptions)
      .pipe(
        tap(response => {
          if (response && response.token) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('currentUser', JSON.stringify(response));
            this.currentUserSubject.next(response);
          }
        })
      );
  }

  forgotPassword(codigo: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, { codigo });
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getCurrentUser(): LoginResponse | null {
    return this.currentUserSubject.value;
  }

  private checkStoredToken(): void {
    const storedUser = localStorage.getItem('currentUser');
    const token = this.getToken();
    
    if (storedUser && token && !this.isTokenExpired(token)) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    } else {
      this.logout();
    }
  }

  private isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp < Date.now() / 1000;
    } catch {
      return true;
    }
  }
}