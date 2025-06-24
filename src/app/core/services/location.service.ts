import { Injectable } from '@angular/core';

interface Coordinates {
  latitude: number;
  longitude: number;
}

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() { }
  getCurrentLocation(): Promise<Coordinates> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            });
          },
          (error) => {
            switch (error.code) {
              case error.PERMISSION_DENIED:
                reject('El usuario denegó la solicitud de geolocalización.');
                break;
              case error.POSITION_UNAVAILABLE:
                reject('La información de ubicación no está disponible.');
                break;
              case error.TIMEOUT:
                reject('La solicitud para obtener la ubicación del usuario expiró.');
                break;
              default:
                reject('Ocurrió un error desconocido al obtener la ubicación.');
                break;
            }
          }
        );
      } else {
        reject('La geolocalización no es compatible con este navegador.');
      }
    });
  }
}
