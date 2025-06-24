import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http'; 
import { MatPaginatorIntl } from '@angular/material/paginator'; // Importa el tipo base

import { getSpanishPaginatorIntl } from './spanish-paginador'; // Importa tu función de traducción


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
        provideHttpClient(),{ provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl() }
  ]
};
