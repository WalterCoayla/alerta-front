
import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet'; 
import { AlertService } from '../../../core/services/alert.service';
import { Alert } from '../../../core/models/alert.model';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-map-display',
  imports: [CommonModule],
  templateUrl: './map-display.component.html',
  styleUrl: './map-display.component.css'
})
export class MapDisplayComponent implements OnInit, AfterViewInit {
  private map: any;
  private alerts: Alert[] = [];

  // Mapeo de tipos de incidente a colores (HEX o CSS)
  private incidentTypeColors: { [key: string]: string } = {
    'incendio': '#FF0000',     // Rojo
    'robo': '#0000FF',         // Azul
    'emergencia': '#FFA500', // Naranja
    'ambulancia': '#800080', // Púrpura
    'accidente': '#FFFF00',    // Amarillo (puede ser difícil de ver)
    'bomberos': '#008000',   // Verde oscuro
    'Otro': '#808080'          // Gris
  };
  // Puedes almacenar los iconos generados para no crearlos múltiples veces
  // private incidentTypeIcons: { [key: string]: L.Icon } = {};

  private incidentTypeIcons: { [key: string]: L.Icon | L.DivIcon } = {}; // <-- ¡CAMBIO AQUÍ!
  // Icono de marcador personalizado (opcional, pero mejora la estética)
  private customIcon = L.icon({
    iconRetinaUrl: 'assets/marker-icon-2x.png', // Descarga estos archivos de Leaflet
    iconUrl: 'assets/marker-icon.png',         // y ponlos en src/assets
    shadowUrl: 'assets/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
  });

  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
    // Al iniciar, obtenemos las alertas
    this.alertService.getAlerts().subscribe(
      response => {
      // Laravel devuelve un objeto con la propiedad 'alerts'
      this.alerts = response.alerts;
      this.generateIncidentIcons(); // Generar íconos antes de añadir marcadores
      this.addMarkersToMap();
      },
      error => {
        console.error('Error al obtener alertas:', error);
      } // Una vez que tenemos las alertas, las añadimos al mapa
    );
  }

   // NUEVO MÉTODO: Generar los íconos de colores
  private generateIncidentIcons(): void {
    for (const type in this.incidentTypeColors) {
      if (this.incidentTypeColors.hasOwnProperty(type)) {
        const color = this.incidentTypeColors[type];
        // Aquí necesitamos una forma de "pintar" el marcador.
        // La forma más sencilla es usar la API de Leaflet para colorear el icono por defecto.
        // Esto a menudo requiere un plugin o generar imágenes dinámicamente (más complejo).
        // Una alternativa más fácil: usar un SVG o una imagen base blanca y superponer un color.
        // O: Usar el plugin 'Leaflet.AwesomeMarkers' o similar que permite colores.

        // Dada la simplicidad, haremos una aproximación:
        // Cargar el icono por defecto y usar el color en el CSS para un pop-up o tooltip.
        // Para cambiar el color del ICONO mismo, necesitas un poco más de trabajo:
        // Opciones:
        // 1. Tener múltiples imágenes de marcador precargadas (ej: marker-red.png, marker-blue.png)
        // 2. Usar un plugin como Leaflet.AwesomeMarkers (recomendado para iconos con color)
        // 3. Generar iconos SVG dinámicamente (complejo)
        // 4. Invertir colores o usar filtros CSS (no siempre se ve bien)

        // Vamos a implementar la OPCIÓN 1 (múltiples imágenes) o la OPCIÓN 2 (plugin)
        // Por ahora, para que el código funcione, utilizaremos un enfoque simplificado
        // donde el icono base es siempre el mismo, y el color se usa en la leyenda y tal vez un popup.
        // Para cambiar el color del icono **realmente**, necesitarías:
        // A) Tener imágenes de íconos de diferentes colores (ej: marker-icon-red.png, marker-icon-blue.png)
        // B) Usar un plugin como Leaflet.AwesomeMarkers.

        // **ACTUALIZACIÓN IMPORTANTE:** Para colorear los iconos directamente,
        // la manera más directa sin plugins complejos es cambiar el `iconUrl`
        // a una imagen que ya tenga el color deseado, o usar un SVG base y manipularlo.
        //
        // Si no quieres descargar múltiples imágenes, puedes usar este hack de CSS
        // que recolorea el icono por defecto de Leaflet. Funciona bien en navegadores modernos.
        // Pero el mejor enfoque es usar un paquete como 'Leaflet.AwesomeMarkers' o Font Awesome.

        // Implementación con recoloreado CSS (requiere más CSS) o usando un icono base
        // que se pueda colorear.
        //
        // Para la demo, vamos a simularlo con un L.CircleMarker para el color base,
        // o asumiremos que tenemos iconos pre-coloreados.
        //
        // Una opción más práctica si no quieres instalar un plugin extra:
        // Utilizar un icono base blanco/negro y aplicar un filtro CSS.
        // Pero eso es avanzado.

        // **La forma más sencilla y robusta sin más librerías:**
        // Usar imágenes pre-coloreadas para cada tipo.
        // O, si las imágenes de Leaflet son SVG, podrías intentar manipular el SVG.
        //
        // ASUMAMOS que tendremos una imagen genérica para el marcador, y
        // para *realmente* cambiar el color, necesitaríamos un plugin.
        // Por ahora, para mostrar una solución que *funcione*, podemos
        // hacer que el icono sea un `L.CircleMarker` con el color o un `L.divIcon` con CSS.

        // Vamos a usar L.divIcon para crear marcadores cuadrados de colores, que es más fácil
        // que manejar imágenes PNG pre-coloreadas o plugins.
        // Esto creará un pequeño div cuadrado del color deseado como marcador.

        // This part remains the same, it correctly creates an L.DivIcon
        this.incidentTypeIcons[type] = L.divIcon({
          className: 'custom-div-icon',
          html: `<div style="background-color: ${color}; width: 15px; height: 15px; border-radius: 50%; border: 2px solid white;"></div>`,
          iconSize: [20, 20],
          iconAnchor: [10, 10]
        });
      }
    }
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    if (!document.getElementById('map')) {
      console.error('Elemento del mapa con ID "map" no encontrado.');
      return;
    }
    this.map = L.map('map', {
      center: [-17.1951384, -70.9108274],
      zoom: 13
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  private initMap1(): void {
    // Inicializar el mapa, centrado en una ubicación inicial (ej. Moquegua, Perú)
    // Coordenadas de Moquegua: -17.1951384 (lat), -70.9108274 (lon)
    this.map = L.map('map', {
      center: [-17.1951384, -70.9108274],
      zoom: 13 // Nivel de zoom inicial
    });

    // Añadir una capa de tiles de OpenStreetMap (mapa base)
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  private addMarkersToMap(): void {
    if (!this.map) {
      console.warn('Mapa no inicializado aún, reintentando añadir marcadores...');
      setTimeout(() => this.addMarkersToMap(), 500);
      return;
    }

    this.map.eachLayer((layer: any) => {
      if (layer instanceof L.Marker) {
        this.map.removeLayer(layer);
      }
    });

    this.alerts.forEach(alert => {
      if (alert.latitude && alert.longitude) {
        // Obtener el icono según el tipo de incidente, si no existe, usar el de 'Otro'
        const icon = this.incidentTypeIcons[alert.incidentType] || this.incidentTypeIcons['Otro'];

        L.marker([alert.latitude, alert.longitude], { icon: icon }) // <-- Usar el icono de color
          .addTo(this.map)
          .bindPopup(`<b>Alerta:</b> ${alert.incidentType}<br>Fecha: ${new Date(alert.created_at!).toLocaleString()}`);
      }
    });

    if (this.alerts.length > 0) {
      const latLngs = this.alerts.filter(a => a.latitude && a.longitude).map(alert => L.latLng(alert.latitude!, alert.longitude!));
      if (latLngs.length > 0) {
        const bounds = L.latLngBounds(latLngs);
        this.map.fitBounds(bounds.pad(0.5));
      }
    }
  }

  // Getter para usar en la plantilla para la leyenda
  get legendItems(): { type: string, color: string }[] {
    console.log('Incident Type Colors:', this.incidentTypeColors); // Verifica que los colores estén ahí
    const items = Object.keys(this.incidentTypeColors).map(type => ({
        type: type,
        color: this.incidentTypeColors[type]
    }));
    console.log('Legend Items for HTML:', items); // Verifica el formato final
    return items;
}
}
