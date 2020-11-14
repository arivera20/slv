import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../../app-settings';

@Injectable({
  providedIn: 'root'
})
export class SenalizadorPreliquidadorService {

  constructor(private http: HttpClient, private appSettings: AppSettings) { }

  // getEstadoSlv
  public getEstadoSlv(): Observable<boolean> {
    console.log('SERVICIO - preliquidador - getEstadoSlv');
    console.log(this.appSettings.URL_senalizador_getEstadoSlv);
    return this.http.get<boolean>
      (this.appSettings.URL_senalizador_getEstadoSlv, this.appSettings.httpOptionsJson);
  }

  // getFrecuenciaSlv
  public getFrecuenciaSlv(): Observable<number> {
    console.log('SERVICIO - preliquidador - getFrecuenciaSlv');
    console.log(this.appSettings.URL_senalizador_getFrecuenciaSlv);
    return this.http.get<number>
      (this.appSettings.URL_senalizador_getFrecuenciaSlv, this.appSettings.httpOptionsJson);
  }

  // getFrecuenciaPurgadoSlv
  public getFrecuenciaPurgadoSlv(): Observable<number> {
    console.log('SERVICIO - preliquidador - getFrecuenciaPurgadoSlv');
    console.log(this.appSettings.URL_senalizador_getFrecuenciaPurgadoSlv);
    return this.http.get<number>
      (this.appSettings.URL_senalizador_getFrecuenciaPurgadoSlv, this.appSettings.httpOptionsJson);
  }

  // getFrecuenciaInicioValoresSlv    VO   salida
  public getFrecuenciaInicioValoresSlv(): Observable<number> {
    console.log('SERVICIO - preliquidador - getFrecuenciaInicioValoresSlv');
    console.log(this.appSettings.URL_senalizador_getFrecuenciaInicioValoresSlv);
    return this.http.get<number>
      (this.appSettings.URL_senalizador_getFrecuenciaInicioValoresSlv, this.appSettings.httpOptionsJson);
  }

  // getFrecuenciaFinValoresSlv    VO   salida
  public getFrecuenciaFinValoresSlv(): Observable<number> {
    console.log('SERVICIO - preliquidador - getFrecuenciaFinValoresSlv');
    console.log(this.appSettings.URL_senalizador_getFrecuenciaFinValoresSlv);
    return this.http.get<number>
      (this.appSettings.URL_senalizador_getFrecuenciaFinValoresSlv, this.appSettings.httpOptionsJson);
  }

  // getFrecuenciaRecepcionSlv    VO   salida
  public getFrecuenciaRecepcionSlv(): Observable<number> {
    console.log('SERVICIO - preliquidador - getFrecuenciaRecepcionSlv');
    console.log(this.appSettings.URL_senalizador_getFrecuenciaRecepcionSlv);
    return this.http.get<number>
      (this.appSettings.URL_senalizador_getFrecuenciaRecepcionSlv, this.appSettings.httpOptionsJson);
  }

  // getFrecuenciaAperturaSlv    VO   salida
  public getFrecuenciaAperturaSlv(): Observable<number> {
    console.log('SERVICIO - preliquidador - getFrecuenciaAperturaSlv');
    console.log(this.appSettings.URL_senalizador_getFrecuenciaAperturaSlv);
    return this.http.get<number>
      (this.appSettings.URL_senalizador_getFrecuenciaAperturaSlv, this.appSettings.httpOptionsJson);
  }

  // getFrecuenciaPreCierreSlv    VO   salida
  public getFrecuenciaPreCierreSlv(): Observable<number> {
    console.log('SERVICIO - preliquidador - getFrecuenciaPreCierreSlv');
    console.log(this.appSettings.URL_senalizador_getFrecuenciaPreCierreSlv);
    return this.http.get<number>
      (this.appSettings.URL_senalizador_getFrecuenciaPreCierreSlv, this.appSettings.httpOptionsJson);
  }

  // getFrecuenciaCierreSlv    VO   salida
  public getFrecuenciaCierreSlv(): Observable<number> {
    console.log('SERVICIO - preliquidador - getFrecuenciaCierreSlv');
    console.log(this.appSettings.URL_senalizador_getFrecuenciaCierreSlv);
    return this.http.get<number>
      (this.appSettings.URL_senalizador_getFrecuenciaCierreSlv, this.appSettings.httpOptionsJson);
  }

  // getFrecuenciaDiasLiq
  public getFrecuenciaDiasLiq(): Observable<string> {
    console.log('SERVICIO - preliquidador - getFrecuenciaDiasLiq');
    console.log(this.appSettings.URL_senalizador_getFrecuenciaDiasLiq);
    return this.http.get<string>
      (this.appSettings.URL_senalizador_getFrecuenciaDiasLiq, this.appSettings.httpOptionsJson);
  }



}
