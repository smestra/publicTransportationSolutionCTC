import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { LandingPageComponent } from './views/landing-page/landing-page.component';
import { HomeComponent } from './views/home/home.component'; // Agregar esta línea
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] }, // Agregar esta línea
  { path: '**', redirectTo: '' }, // Ruta wildcard para manejar rutas no encontradas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
