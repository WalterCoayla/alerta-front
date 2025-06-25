import { Component, OnInit } from '@angular/core';
import { RouterOutlet,RouterModule, Router } from '@angular/router';
// import { Router } from '@angular/router'; // <-- Importa el Router
// import { PanicButtonComponent } from './shared/components/panic-button/panic-button.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common'; // Importa CommonModule para *ngIf
import { AuthService } from './services/auth.service'; // Importa el servicio

@Component({
  selector: 'app-root',
  standalone: true, // Asegúrate de que AppComponent también sea standalone
  imports: [
    RouterOutlet,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    CommonModule // Añade CommonModule aquí
    /* RouterOutlet */
   ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'alerta-Moquegua';
  // Inyecta el servicio Router en el consconstructor(public authService: AuthService, private router: Router) {} // Inyecta AuthService y Router
  constructor(public authService: AuthService, private router: Router) {} 

  ngOnInit() {
    // Si hay un token, intenta obtener los datos del usuario para mantener la sesión
    if (this.authService.isLoggedIn() && !this.authService.currentUserValue) {
      this.authService.getCurrentUser().subscribe({
        error: () => this.logout() // Si falla, cerrar sesión
      });
    }
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error al cerrar sesión', err);
        // Aún si hay error en el backend, forzar el logout local
        localStorage.removeItem('access_token');
        localStorage.removeItem('currentUser');
        this.authService['currentUserSubject'].next(null); // Acceso directo para resetear
        this.router.navigate(['/login']);
      }
    });
  }

  navigateToMap() {
    this.router.navigate(['/mapa']); // Navega a la ruta '/mapa'
  }
  navigateToHome() {
    this.router.navigate(['/boton']); // Navega a la ruta '/mapa'
  }
  navigateToAlert() {
    this.router.navigate(['/list']); // Navega a la ruta '/mapa'
  }
}
