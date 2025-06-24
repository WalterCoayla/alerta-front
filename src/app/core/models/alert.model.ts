export class Alert {
  latitude: number;
  longitude: number;
  //timestamp: Date;
  //message: string;
  userId?: string;
  incidentType: string; // <-- ¡Añade esta nueva propiedad!
  created_at?:string;

  constructor(latitude: number, longitude: number, incidentType: string, userId?: string, ) {
    this.latitude = latitude;
    this.longitude = longitude;
    //this.timestamp = timestamp;
    //this.message = message;
    this.userId = userId;
    this.incidentType = incidentType;
  }
}
