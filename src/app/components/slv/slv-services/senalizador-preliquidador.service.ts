import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../../app-settings';
import { HoraVO } from '../slv-class/HoraVO';

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
  public getFrecuenciaInicioValoresSlv(): Observable<HoraVO> {
    console.log('SERVICIO - preliquidador - getFrecuenciaInicioValoresSlv');
    console.log(this.appSettings.URL_senalizador_getFrecuenciaInicioValoresSlv);
    return this.http.get<HoraVO>
      (this.appSettings.URL_senalizador_getFrecuenciaInicioValoresSlv, this.appSettings.httpOptionsJson);
  }

  // getFrecuenciaFinValoresSlv    VO   salida
  public getFrecuenciaFinValoresSlv(): Observable<HoraVO> {
    console.log('SERVICIO - preliquidador - getFrecuenciaFinValoresSlv');
    console.log(this.appSettings.URL_senalizador_getFrecuenciaFinValoresSlv);
    return this.http.get<HoraVO>
      (this.appSettings.URL_senalizador_getFrecuenciaFinValoresSlv, this.appSettings.httpOptionsJson);
  }

  // getFrecuenciaRecepcionSlv    VO   salida
  public getFrecuenciaRecepcionSlv(): Observable<HoraVO> {
    console.log('SERVICIO - preliquidador - getFrecuenciaRecepcionSlv');
    console.log(this.appSettings.URL_senalizador_getFrecuenciaRecepcionSlv);
    return this.http.get<HoraVO>
      (this.appSettings.URL_senalizador_getFrecuenciaRecepcionSlv, this.appSettings.httpOptionsJson);
  }

  // getFrecuenciaAperturaSlv    VO   salida
  public getFrecuenciaAperturaSlv(): Observable<HoraVO> {
    console.log('SERVICIO - preliquidador - getFrecuenciaAperturaSlv');
    console.log(this.appSettings.URL_senalizador_getFrecuenciaAperturaSlv);
    return this.http.get<HoraVO>
      (this.appSettings.URL_senalizador_getFrecuenciaAperturaSlv, this.appSettings.httpOptionsJson);
  }

  // getFrecuenciaPreCierreSlv    VO   salida
  public getFrecuenciaPreCierreSlv(): Observable<HoraVO> {
    console.log('SERVICIO - preliquidador - getFrecuenciaPreCierreSlv');
    console.log(this.appSettings.URL_senalizador_getFrecuenciaPreCierreSlv);
    return this.http.get<HoraVO>
      (this.appSettings.URL_senalizador_getFrecuenciaPreCierreSlv, this.appSettings.httpOptionsJson);
  }

  // getFrecuenciaCierreSlv    VO   salida
  public getFrecuenciaCierreSlv(): Observable<HoraVO> {
    console.log('SERVICIO - preliquidador - getFrecuenciaCierreSlv');
    console.log(this.appSettings.URL_senalizador_getFrecuenciaCierreSlv);
    return this.http.get<HoraVO>
      (this.appSettings.URL_senalizador_getFrecuenciaCierreSlv, this.appSettings.httpOptionsJson);
  }

  // getFrecuenciaDiasLiq
  public getFrecuenciaDiasLiq(): Observable<string> {
    console.log('SERVICIO - preliquidador - getFrecuenciaDiasLiq');
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    console.log(this.appSettings.URL_senalizador_getFrecuenciaDiasLiq);
    return this.http.get<string>
      (this.appSettings.URL_senalizador_getFrecuenciaDiasLiq, { headers, responseType: 'text' as 'json' });
  }

  public updateFrecuenciaSlv(frecuenciaMinutos: number, usuario: string): Observable<any> {
    console.log('SERVICIO - senalizadorPreliquidador - updateFrecuenciaSlv');
    const headers = new HttpHeaders().append('header', 'value');
    // tslint:disable-next-line: max-line-length
    return this.http.get('slv-preliquidador/api/senalizadorPreliquidador/updateFrecuenciaSlv/' + frecuenciaMinutos + '/' + usuario, { headers });
  }

  public updateFrecuenciaPurgadoSlv(frecuenciaMinutos: number, usuario: string): Observable<any> {
    console.log('SERVICIO - senalizadorPreliquidador - updateFrecuenciaPurgadoSlv');
    const headers = new HttpHeaders().append('header', 'value');
    // tslint:disable-next-line: max-line-length
    return this.http.get('slv-preliquidador/api/senalizadorPreliquidador/updateFrecuenciaPurgadoSlv/' + frecuenciaMinutos + '/' + usuario, { headers });
  }

  public updateFrecuenciaInicioValoresSlv(hora: number, minuto: number, usuario: string): Observable<any> {
    console.log('SERVICIO - senalizadorPreliquidador - updateFrecuenciaInicioValoresSlv');
    const headers = new HttpHeaders().append('header', 'value');
    // tslint:disable-next-line: max-line-length
    return this.http.get('slv-preliquidador/api/senalizadorPreliquidador/updateFrecuenciaInicioValoresSlv/' + hora + '/' + minuto + '/' + usuario, { headers });
  }

  public updateFrecuenciaFinValoresSlv(hora: number, minuto: number, usuario: string): Observable<any> {
    console.log('SERVICIO - senalizadorPreliquidador - updateFrecuenciaFinValoresSlv');
    const headers = new HttpHeaders().append('header', 'value');
    // tslint:disable-next-line: max-line-length
    return this.http.get('slv-preliquidador/api/senalizadorPreliquidador/updateFrecuenciaFinValoresSlv/' + hora + '/' + minuto + '/' + usuario, { headers });
  }

  public updateFrecuenciaRecepcionSlv(hora: number, minuto: number, usuario: string): Observable<any> {
    console.log('SERVICIO - senalizadorPreliquidador - updateFrecuenciaRecepcionSlv');
    const headers = new HttpHeaders().append('header', 'value');
    // tslint:disable-next-line: max-line-length
    return this.http.get('slv-preliquidador/api/senalizadorPreliquidador/updateFrecuenciaRecepcionSlv/' + hora + '/' + minuto + '/' + usuario, { headers });
  }

  public updateFrecuenciaAperturaSlv(hora: number, minuto: number, usuario: string): Observable<any> {
    console.log('SERVICIO - senalizadorPreliquidador - updateFrecuenciaAperturaSlv');
    const headers = new HttpHeaders().append('header', 'value');
    // tslint:disable-next-line: max-line-length
    return this.http.get('slv-preliquidador/api/senalizadorPreliquidador/updateFrecuenciaAperturaSlv/' + hora + '/' + minuto + '/' + usuario, { headers });
  }

  public updateFrecuenciaPreCierreSlv(hora: number, minuto: number, usuario: string): Observable<any> {
    console.log('SERVICIO - senalizadorPreliquidador - updateFrecuenciaPreCierreSlv');
    const headers = new HttpHeaders().append('header', 'value');
    // tslint:disable-next-line: max-line-length
    return this.http.get('slv-preliquidador/api/senalizadorPreliquidador/updateFrecuenciaPreCierreSlv/' + hora + '/' + minuto + '/' + usuario, { headers });
  }

  public updateFrecuenciaCierreSlv(hora: number, minuto: number, usuario: string): Observable<any> {
    console.log('SERVICIO - senalizadorPreliquidador - updateFrecuenciaCierreSlv');
    const headers = new HttpHeaders().append('header', 'value');
    // tslint:disable-next-line: max-line-length
    return this.http.get('slv-preliquidador/api/senalizadorPreliquidador/updateFrecuenciaCierreSlv/' + hora + '/' + minuto + '/' + usuario, { headers });
  }

  public updateFrecuenciaDiasLiq(diasLiquidacion: string, usuario: string): Observable<any> {
    console.log('SERVICIO - senalizadorPreliquidador - updateFrecuenciaDiasLiq');
    const headers = new HttpHeaders().append('header', 'value');
    // tslint:disable-next-line: max-line-length
    return this.http.get('slv-preliquidador/api/senalizadorPreliquidador/updateFrecuenciaDiasLiq/' + diasLiquidacion + '/' + usuario, { headers });
  }

}
