// src/app/components/alert-list/alert-list.component.ts
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertService } from '../../../core/services/alert.service';
import { Alert } from '../../../core/models/alert.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field'; // <-- Añade este
import { MatInputModule } from '@angular/material/input';     // <-- Añade este
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator'; // <-- Añade este

// Importa MatDialog y MatDialogModule para el modal
import { MatDialog, MatDialogModule } from '@angular/material/dialog'; 


@Component({
  selector: 'app-alert-list',
  templateUrl: './alert-list.component.html',
  styleUrls: ['./alert-list.component.css'],
  imports: [ // Aquí van los módulos que este componente necesita
    MatTableModule,
    MatIconModule, // Añádelo si lo usas en el HTML de este componente
    MatButtonModule, // Añádelo si lo usas en el HTML de este componente
     CommonModule, // Solo si necesitas directivas como ngIf, ngFor (ya incluido por defecto en nuevos proyectos)
    MatFormFieldModule, // <-- Añádelo aquí
    MatInputModule,      // <-- Añádelo aquí
    MatPaginatorModule,
    MatDialogModule 
  ]
})
export class AlertListComponent implements OnInit {

  // Define las columnas que quieres mostrar en la tabla
  displayedColumns: string[] = ['id', 'latitude', 'longitude','incidentType', 'created_at'];
  dataSource = new MatTableDataSource<Alert>(); // DataSource para la tabla de Material
  private alerts: Alert[] = [];
  // Declara @ViewChild para obtener una referencia al MatPaginator
  @ViewChild(MatPaginator) paginator!: MatPaginator; // El '!' indica que se inicializará


  constructor(private alertService: AlertService, private dialog: MatDialog) { }

  ngOnInit(): void {
   //  this.getAlerts();
    this.alertService.getAlerts().subscribe(
      response => {
      // Laravel devuelve un objeto con la propiedad 'alerts'
      // this.alerts = response.alerts;
      this.dataSource.data = response.alerts;
      //this.generateIncidentIcons(); // Generar íconos antes de añadir marcadores
      //this.addMarkersToMap();
      },
      error => {
        console.error('Error al obtener alertas:', error);
      } // Una vez que tenemos las alertas, las añadimos al mapa
    );
  }
  // **Nuevo método:** hook de ciclo de vida para configurar el paginator
  ngAfterViewInit() {
    // Es crucial asignar el paginator aquí, después de que los elementos de la vista estén disponibles
    this.dataSource.paginator = this.paginator;
  }

  // Nuevo método para aplicar el filtro
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    /// Cuando se aplica un filtro, volvemos a la primera página
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}