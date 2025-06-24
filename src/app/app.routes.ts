import { Routes } from '@angular/router';
import { PanicButtonComponent } from './shared/components/panic-button/panic-button.component'; // Importa el componente
import { MapDisplayComponent } from './shared/components/map-display/map-display.component' ;
import { AlertListComponent } from './shared/components/alert-list/alert-list.component' ;


export const routes: Routes = [
  { path: 'mapa', component: MapDisplayComponent }, // <-- ¡Añade esta línea!
  { path: 'list', component: AlertListComponent }, // <-- ¡Añade esta línea!
    {
    path: '', // La ruta vacía significa la raíz de la aplicación (e.g., http://localhost:4200/)
    component: PanicButtonComponent // Este es el componente que se cargará por defecto
  },
];
