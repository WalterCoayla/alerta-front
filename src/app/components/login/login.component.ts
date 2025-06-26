import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router'; // Importa RouterLink
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    RouterLink // Asegúrate de importar RouterLink
  ]
})
export class LoginComponent {
  credentials = {
    email: '',
    password: ''
  };
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        console.log('Inicio de sesión exitoso', response);
        this.router.navigate(['/boton']); // Redirige al listado de alertas
      },
      error: (err) => {
        console.error('Error en el inicio de sesión', err);
        if (err.error && err.error.message) {
          this.errorMessage = err.error.message;
        } else if (err.error && err.error.errors) {
          this.errorMessage = Object.values(err.error.errors).flat().join(' ');
        } else {
          this.errorMessage = 'Ocurrió un error inesperado al iniciar sesión.';
        }
      }
    });
  }
}