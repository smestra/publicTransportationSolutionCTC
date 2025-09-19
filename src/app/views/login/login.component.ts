import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  forgotPasswordForm: FormGroup;
  forgotpassword: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';
  loading: boolean = false;

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

  onLogin() {
    if (this.loginForm.valid) {
      this.loading = true;
      this.errorMessage = '';
      
      this.authService.login(
        this.loginForm.get('codigo')?.value,
        this.loginForm.get('password')?.value
      ).subscribe({
        next: (response) => {
          this.loading = false;
          // Redirigir al dashboard o página principal
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.loading = false;
          this.errorMessage = error.error.message || 'Error al iniciar sesión';
        }
      });
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
          this.errorMessage = error.error.message || 'Error al procesar la solicitud';
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
}