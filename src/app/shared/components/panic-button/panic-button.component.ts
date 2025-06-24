import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf, NgForOf  } from '@angular/common'; // Importa CommonModule y NgIf
import { FormsModule } from '@angular/forms'; // <-- ¡Añade esta importación!
import { LocationService } from '../../../core/services/location.service';
import { AlertService } from '../../../core/services/alert.service';
import { Alert } from '../../../core/models/alert.model';
import { MatButtonToggleModule } from '@angular/material/button-toggle'; // <-- Importa este módulo
import { MatIconModule } from '@angular/material/icon'; // <-- ¡Importa este módulo!


@Component({
  selector: 'app-panic-button',
  standalone: true,
  imports: [CommonModule, NgIf, NgForOf,FormsModule, MatButtonToggleModule, MatIconModule ],
  templateUrl: './panic-button.component.html',
  styleUrl: './panic-button.component.css'
})
export class PanicButtonComponent  implements OnInit{
  currentLatitude: number | null = null;
  currentLongitude: number | null = null;
  locationError: string | null = null;
  isSendingAlert: boolean = false; // Para deshabilitar el botón mientras se envía

  selectedIncidentType: string | null = null; // <-- Nueva propiedad para almacenar la selección

  incidentTypes: { value: string; label: string; icon: string }[] = [ // <-- ¡Añade la propiedad 'icon'!
    { value: 'ambulancia', label: 'Ambulancia', icon: 'local_hospital' },
    { value: 'serenazgo', label: 'Serenazgo', icon: 'security' },
    { value: 'bomberos', label: 'Bomberos', icon: 'fire_extinguisher' },
    { value: 'auxilio-vial', label: 'Auxilio Vial', icon: 'car_repair' }, // 'road_repair' si es más específico
    { value: 'policia', label: 'Policía', icon: 'local_police' },
    { value: 'rescate-animal', label: 'Rescate Animal', icon: 'pets' }
  ];

  constructor(
  private locationService: LocationService,
  private alertService: AlertService
) { }

  ngOnInit(): void {
    // Al inicializar el componente, intenta obtener la ubicación
    this.getAndDisplayLocation();
  }
  getAndDisplayLocation(): void {
    this.locationError = null; // Limpiar errores previos
    this.locationService.getCurrentLocation().then(coordinates => {
      this.currentLatitude = coordinates.latitude;
      this.currentLongitude = coordinates.longitude;
    }).catch(error => {
      this.locationError = `Error al obtener ubicación: ${error}`;
      console.error('Error al obtener la ubicación en PanicButtonComponent:', error);
    });
  }

  // Nuevo método: se llama cuando cambia la selección del tipo de incidente
  onIncidentTypeChange(): void {
    if (this.selectedIncidentType !== null) {
      console.log('Tipo de incidente seleccionado:', this.selectedIncidentType, ' - Refrescando ubicación...');
      this.getAndDisplayLocation(); // Vuelve a llamar a la función para obtener la ubicación
    }
  }
  
  sendPanicAlert(): void {
    if (this.isSendingAlert || this.currentLatitude === null || this.currentLongitude === null) {
      console.warn('Alerta ya en envío o ubicación no disponible.');
      return;
    }

    if (this.selectedIncidentType === null) {
      alert('Por favor, selecciona un tipo de incidente.');
      return; // No enviar si no se ha seleccionado un tipo
    }

    this.isSendingAlert = true;

    const alertData: Alert = {
      latitude: this.currentLatitude,
      longitude: this.currentLongitude,
      //timestamp: new Date(),
      //message: `¡Botón de pánico activado! Tipo: ${this.selectedIncidentType}`, // <-- Incluye el tipo de incidente en el mensaje
      incidentType: this.selectedIncidentType // <-- Nueva propiedad en el modelo de alerta
    };

    this.alertService.sendAlert(alertData).subscribe({
      next: (response) => {
        console.log('Alerta enviada con éxito:', response);
        alert('¡Alerta de pánico enviada con éxito!');
        this.isSendingAlert = false;
        // Opcional: reiniciar la selección o estado
        this.selectedIncidentType = null; // Restablecer la selección después de enviar
      },
      error: (error) => {
        console.error('Error al enviar la alerta:', error);
        alert(`Error al enviar la alerta: ${error.message || error}`);
        this.isSendingAlert = false;
      }
    });
  }
}
