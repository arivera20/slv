import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../../app-settings';

@Injectable({
  providedIn: 'root'
})
export class CompensadorService {

  constructor(private http: HttpClient, private appSettings: AppSettings) { }

  // getTimeoutRespuesta
  public getTimeoutRespuesta(): Observable<number> {
    console.log('SERVICIO - preliquidador - getTimeoutRespuesta');
    console.log(this.appSettings.URL_compensador_getTimeoutRespuesta);
    return this.http.get<number>
      (this.appSettings.URL_compensador_getTimeoutRespuesta, this.appSettings.httpOptionsJson);
  }

  // isCompensadorActivo
  public isCompensadorActivo(): Observable<boolean> {
    console.log('SERVICIO - preliquidador - isCompensadorActivo');
    console.log(this.appSettings.URL_compensador_isCompensadorActivo);
    return this.http.get<boolean>
      (this.appSettings.URL_compensador_isCompensadorActivo, this.appSettings.httpOptionsJson);
  }

  public modificarTimeoutRespuesta(timeoutRespuesta: number, usuario: string): Observable<any> {
    console.log('SERVICIO - preliquidador - modificarTimeoutRespuesta');
    const headers = new HttpHeaders().append('header', 'value');
    // tslint:disable-next-line: max-line-length
    return this.http.get('slv-preliquidador/api/compensadorController/modificarTimeoutRespuesta/' + timeoutRespuesta + '/' + usuario, { headers });
  }



}
