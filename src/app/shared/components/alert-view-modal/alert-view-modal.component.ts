// src/app/components/alert-view-modal/alert-view-modal.component.ts
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog'; // <-- Importa estos
import { Alert } from './../../../core/models/alert.model'; // Importa tu modelo de alerta

// Opcional: Si quieres usar botones o iconos de Material en el modal
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-alert-view-modal',
  templateUrl: './alert-view-modal.component.html',
  styleUrls: ['./alert-view-modal.component.css'],
  standalone: true,
  imports: [
    MatDialogModule, // Necesario para componentes de diálogo
    MatButtonModule, // Para el botón de cerrar
    MatIconModule    // Para iconos
  ]
})
export class AlertViewModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AlertViewModalComponent>, // Referencia al diálogo abierto
    @Inject(MAT_DIALOG_DATA) public data: Alert // Datos que se le pasan al diálogo
  ) { }

  ngOnInit(): void {
    // Los datos de la alerta están disponibles en this.data
    console.log('Datos de la alerta en modal:', this.data);
  }

  onNoClick(): void {
    this.dialogRef.close(); // Cierra el modal
  }
}