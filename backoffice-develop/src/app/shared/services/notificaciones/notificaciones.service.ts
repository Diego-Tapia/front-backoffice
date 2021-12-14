import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { INotificacion } from '../../models/notificacion.interface';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {
  
  private url = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getNotificaciones(): Observable<any> {        
		return this.http.get<any>(`${this.url}/notifications`);
	}

  nuevaNotificacionMasiva(notificacion: INotificacion): Observable<INotificacion> {
    return this.http.post<INotificacion>(`${this.url}/notifications`, notificacion);

  }
}
