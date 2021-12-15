import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAplicabilidad } from '../../models/aplicabilidad.interface';

@Injectable({
  providedIn: 'root'
})
export class AplicabilidadesService {
  private url = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getAplicabilidades(): Observable<IAplicabilidad[]> {
    return this.http.get<IAplicabilidad[]>(`${this.url}/applicabilities`)
  }
}
