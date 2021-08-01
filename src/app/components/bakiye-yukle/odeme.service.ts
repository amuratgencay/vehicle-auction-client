import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Enrollment } from './enrollment-mode';
import { Observable } from 'rxjs';
import { IPaySecure } from './ipaysecure-model';

@Injectable({
  providedIn: 'root'
})
export class OdemeService {
  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.apiUrl;
  }
  enrollment(data: Enrollment): Observable<IPaySecure> {
    return this.http.post<IPaySecure>(`${this.baseUrl}Odeme/enrollment`, data);
  }
}
