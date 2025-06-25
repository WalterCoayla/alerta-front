import { Routes } from '@angular/router';
import { PanicButtonComponent } from './shared/components/panic-button/panic-button.component'; // Importa el componente
import { MapDisplayComponent } from './shared/components/map-display/map-display.component' ;
import { AlertListComponent } from './shared/components/alert-list/alert-list.component' ;
import { LoginComponent } from './components/login/login.component'; // Importa
import { RegisterComponent } from './components/register/register.component'; // Importa
import { AuthGuard } from './guards/auth.guard';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'mapa', component: MapDisplayComponent, canActivate: [AuthGuard]  }, // <-- ¡Añade esta línea!
  { path: 'list', component: AlertListComponent, canActivate: [AuthGuard]  }, // <-- ¡Añade esta línea!
  {
    path: 'boton', // La ruta vacía significa la raíz de la aplicación (e.g., http://localhost:4200/)
    component: PanicButtonComponent // Este es el componente que se cargará por defecto
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirige a login por defecto
  { path: '**', redirectTo: '/login' } // Para rutas no encontradas
];
