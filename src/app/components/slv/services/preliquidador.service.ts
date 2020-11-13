import { Injectable } from '@angular/core';
import { AppSettings } from '../../app-settings';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreliquidadorService {

  constructor(private http: HttpClient, private appSettings: AppSettings) { }

  /** preliquidador */

  // http://10.150.201.205:8380/slv-preliquidador/api/preliquidador/getVersion
  // getVersion
  public getVersion(): Observable<string> {
    console.log('SERVICIO - preliquidador - getVersion');
    console.log(this.appSettings.urlTEST);
    return this.http.get<string>
      (this.appSettings.URL_preliquidador_getVersion, this.appSettings.httpOptionsJson);
  }

  // preliquidador/getPrecioTituloMaximoParaCompensacion
  public getPrecioTituloMaximoParaCompensacion(): Observable<number> {
    console.log('SERVICIO - preliquidador - getPrecioTituloMaximoParaCompensacion');
    console.log(this.appSettings.urlTEST);
    return this.http.get<number>
      (this.appSettings.URL_preliquidador_getPrecioTituloMaximoParaCompensacion, this.appSettings.httpOptionsJson);
  }

  // preliquidador/getMontoTotalActualInstrucciones
  public getMontoTotalActualInstrucciones(): Observable<number> {
    console.log('SERVICIO - preliquidador - getMontoTotalActualInstrucciones');
    console.log(this.appSettings.urlTEST);
    return this.http.get<number>
      (this.appSettings.URL_preliquidador_getPrecioTituloMaximoParaCompensacion, this.appSettings.httpOptionsJson);
  }
}
