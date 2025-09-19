import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api'; // Ajusta esta URL según tu backend

  constructor(private http: HttpClient) { }

  login(codigo: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, {
      codigo,
      password
    }).pipe(
      map((response: any) => {
        // Guardar el token en localStorage
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
        }
        return response;
      })
    );
  }

  forgotPassword(codigo: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/forgot-password`, { codigo });
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/reset-password`, {
      token,
      newPassword
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
