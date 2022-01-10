import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IRol } from '../../models/rol.interface';


@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private url = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getRoles(): Observable<IRol[]> {
    return this.http.get<IRol[]>(`${this.url}/role`)
  }
}
