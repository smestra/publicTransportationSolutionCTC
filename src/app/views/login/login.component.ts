import { Component } from '@angular/core';
import { Router } from '@angular/router';
// import { AuthService } from '../../services/auth.service'; // Importa el servicio de autenticación  

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
 email: string = '';
 password: string = '';
 forgotpassword: boolean = false;

 constructor(
  private router: Router)
  {}

 btnForgotPassword(){
  this.forgotpassword = !this.forgotpassword;
 }
 btnSendToRegister(){
  this.router.navigate(['/register']);
 }
forgotPassword(){
  // Aquí puedes implementar la lógica para enviar un correo de recuperación de contraseña
  console.log('Recuperación de contraseña para:', this.email);
  // Por ejemplo, llamar a un servicio de autenticación para enviar el correo
}

sendToRegister() {
  this.router.navigate(['/register']);
}
}