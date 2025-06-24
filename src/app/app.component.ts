import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router'; // <-- Importa el Router
// import { PanicButtonComponent } from './shared/components/panic-button/panic-button.component';


@Component({
  selector: 'app-root',
  standalone: true, // Asegúrate de que AppComponent también sea standalone
  imports: [RouterOutlet ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'alerta-app';

  // Inyecta el servicio Router en el constructor
  constructor(private router: Router) { }

  navigateToMap() {
    this.router.navigate(['/mapa']); // Navega a la ruta '/mapa'
  }
  navigateToHome() {
    this.router.navigate(['/']); // Navega a la ruta '/mapa'
  }
  navigateToAlert() {
    this.router.navigate(['/list']); // Navega a la ruta '/mapa'
  }
}
