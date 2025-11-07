import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  forgotPasswordForm: FormGroup;
  forgotpassword: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';
  loading: boolean = false;
  showLoginForm: boolean = true;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      codigo: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.forgotPasswordForm = this.formBuilder.group({
      codigo: ['', [Validators.required, Validators.minLength(5)]]
    });
    
  }
    
   ngOnInit() {if (this.authService.isLoggedIn()) {
      this.showLoginForm = false;
      this.router.navigate(['/home']);
    }
  }
  onLogin() {
    if (this.loginForm.valid) {
      this.loading = true;
      this.errorMessage = '';
      
      const codigo = this.loginForm.get('codigo')?.value;
      const password = this.loginForm.get('password')?.value;
      
      this.authService.login(codigo, password).subscribe({
        next: (response) => {
          this.loading = false;
          console.log('Login exitoso:', response);
          this.showLoginForm = false;
          this.router.navigate(['/home']);
        },
        error: (error) => {
          this.loading = false;
          console.error('Error de login:', error);
          
          if (error.status === 403 || error.status === 401) {
            this.errorMessage = 'Credenciales inválidas';
          } else if (error.status === 400) {
            this.errorMessage = 'Datos inválidos';
          } else if (error.status === 0) {
            this.errorMessage = 'No se pudo conectar con el servidor.';
          } else {
            this.errorMessage = error.error || 'Error en el servidor. Por favor, intenta más tarde.';
          }
        }
      });
    } else {
      this.errorMessage = 'Por favor, completa todos los campos correctamente.';
    }
  }

  onForgotPassword() {
    if (this.forgotPasswordForm.valid) {
      this.loading = true;
      this.errorMessage = '';
      
      this.authService.forgotPassword(
        this.forgotPasswordForm.get('codigo')?.value
      ).subscribe({
        next: (response) => {
          this.loading = false;
          this.successMessage = 'Se ha enviado un correo con las instrucciones para recuperar tu contraseña';
        },
        error: (error) => {
          this.loading = false;
          this.errorMessage = error.error?.message || 'Error al procesar la solicitud';
        }
      });
    }
  }

  btnForgotPassword() {
    this.forgotpassword = !this.forgotpassword;
    this.errorMessage = '';
    this.successMessage = '';
  }

  sendToRegister() {
    this.router.navigate(['/register']);
  }
  // hideComponent: boolean = false;

 goToLandingPage() {
    this.router.navigate(['/']);
  }
}