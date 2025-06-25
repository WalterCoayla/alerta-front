import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'; // Añade withInterceptorsFromDi
// import { provideAnimations } from '@angular/platform-browser/animations';

import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
// import { provideHttpClient } from '@angular/common/http'; 
import { MatPaginatorIntl } from '@angular/material/paginator'; // Importa el tipo base

import { getSpanishPaginatorIntl } from './spanish-paginador'; // Importa tu función de traducción

import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http'; // <-- Importa esto
import { AuthInterceptor } from './auth.interceptor'; // <-- Importa tu interceptor



export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
        provideHttpClient(withInterceptorsFromDi()),
        
        { provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() },
        // Registra el interceptor
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
};
