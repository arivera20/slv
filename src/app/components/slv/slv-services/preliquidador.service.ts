import { Injectable } from '@angular/core';
import { AppSettings } from '../../app-settings';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreliquidadorService {

  constructor(private http: HttpClient, private appSettings: AppSettings) { }

  public liquidacionFinDeDia(usuario: string): Observable<boolean> {
    console.log('SERVICIO - preliquidador - liquidacionFinDeDia');
    const headers = new HttpHeaders().append('header', 'value');
    // tslint:disable-next-line: max-line-length
    return this.http.get<boolean>(this.appSettings.path + 'slv-preliquidador/api/preliquidador/liquidacionFinDeDia/' + usuario, { headers });
  }

  public procesarAperturaPreLiqFinDia(usuario: string): Observable<any> {
    console.log('SERVICIO - preliquidador - procesarAperturaPreLiqFinDia');
    const headers = new HttpHeaders().append('header', 'value');
    // tslint:disable-next-line: max-line-length
    return this.http.get(this.appSettings.path + 'slv-preliquidador/api/preliquidador/procesarAperturaPreLiqFinDia/' + usuario, { headers });
  }

  public iniciarCicloLiquidacionAsincrono(usuario: string): Observable<any> {
    console.log('SERVICIO - preliquidador - iniciarCicloLiquidacionAsincrono');
    const headers = new HttpHeaders().append('header', 'value');
    // tslint:disable-next-line: max-line-length
    return this.http.get(this.appSettings.path + 'slv-preliquidador/api/preliquidador/iniciarCicloLiquidacionAsincrono/' + usuario, { headers });
  }

  public pausarPreliquidador(usuario: string): Observable<any> {
    console.log('SERVICIO - preliquidador - pausarPreliquidador');
    const headers = new HttpHeaders().append('header', 'value');
    // tslint:disable-next-line: max-line-length
    return this.http.get(this.appSettings.path + 'slv-preliquidador/api/preliquidador/pausarPreliquidador/' + usuario, { headers });
  }

  public reanudarPreliquidador(usuario: string): Observable<any> {
    console.log('SERVICIO - preliquidador - reanudarPreliquidador');
    const headers = new HttpHeaders().append('header', 'value');
    // tslint:disable-next-line: max-line-length
    return this.http.get(this.appSettings.path + 'slv-preliquidador/api/preliquidador/reanudarPreliquidador/' + usuario, { headers });
  }

  public resetPreliquidador(usuario: string): Observable<any> {
    console.log('SERVICIO - preliquidador - resetPreliquidador');
    const headers = new HttpHeaders().append('header', 'value');
    // tslint:disable-next-line: max-line-length
    return this.http.get(this.appSettings.path + 'slv-preliquidador/api/preliquidador/resetPreliquidador/' + usuario, { headers });
  }

  public procesarAperturaPostLiqFinDia(usuario: string): Observable<any> {
    console.log('SERVICIO - preliquidador - procesarAperturaPostLiqFinDia');
    const headers = new HttpHeaders().append('header', 'value');
    // tslint:disable-next-line: max-line-length
    return this.http.get(this.appSettings.path + 'slv-preliquidador/api/preliquidador/procesarAperturaPostLiqFinDia/' + usuario, { headers });
  }

  public modificarPrecioTituloMaximoParaCompensacion(umbral: string, usuario: string): Observable<any> {
    console.log('SERVICIO - preliquidador - modificarPrecioTituloMaximoParaCompensacion');
    const headers = new HttpHeaders().append('header', 'value');
    // tslint:disable-next-line: max-line-length
    return this.http.get(this.appSettings.path + 'slv-preliquidador/api/preliquidador/modificarPrecioTituloMaximoParaCompensacion/' + umbral + '/' + usuario, { headers });
  }

  public modificarNumeroTotalMaxInstrucciones(numero: string, usuario: string): Observable<any> {
    console.log('SERVICIO - preliquidador - modificarNumeroTotalMaxInstrucciones');
    const headers = new HttpHeaders().append('header', 'value');
    return this.http.get(this.appSettings.path + 'slv-preliquidador/api/preliquidador/modificarNumeroTotalMaxInstrucciones/' + numero + '/' + usuario, { headers });
  }

  public modificarMontoTotalMaxInstrucciones(monto: string, usuario: string): Observable<any> {
    console.log('SERVICIO - preliquidador - modificarMontoTotalMaxInstrucciones');
    const headers = new HttpHeaders().append('header', 'value');
    return this.http.get(this.appSettings.path + 'slv-preliquidador/api/preliquidador/modificarMontoTotalMaxInstrucciones/' + monto + '/' + usuario, { headers });
  }

  public modificarGatilloDinamicoActivo(gatillo: boolean, usuario: string): Observable<any> {
    console.log('SERVICIO - preliquidador - modificarGatilloDinamicoActivo');
    const headers = new HttpHeaders().append('header', 'value');
    return this.http.get(this.appSettings.path + 'slv-preliquidador/api/preliquidador/modificarGatilloDinamicoActivo/' + gatillo + '/' + usuario, { headers });
  }

  public modificarReencoladoAutomatico(reencolado: boolean, usuario: string): Observable<any> {
    console.log('SERVICIO - preliquidador - modificarReencoladoAutomatico');
    const headers = new HttpHeaders().append('header', 'value');
    return this.http.get(this.appSettings.path + 'slv-preliquidador/api/preliquidador/modificarReencoladoAutomatico/' + reencolado + '/' + usuario, { headers });
  }

  public modificarLimitarRetiros(limitarRetiros: boolean, usuario: string): Observable<any> {
    console.log('SERVICIO - preliquidador - modificarLimitarRetiros');
    const headers = new HttpHeaders().append('header', 'value');
    return this.http.get(this.appSettings.path + 'slv-preliquidador/api/preliquidador/modificarLimitarRetiros/' + limitarRetiros + '/' + usuario, { headers });
  }

  public modificarNumeroMaximoRetiros(numeroMaximoRetiros: number, usuario: string): Observable<any> {
    console.log('SERVICIO - preliquidador - modificarNumeroMaximoRetiros');
    const headers = new HttpHeaders().append('header', 'value');
    // tslint:disable-next-line: max-line-length
    return this.http.get(this.appSettings.path + 'slv-preliquidador/api/preliquidador/modificarNumeroMaximoRetiros/' + numeroMaximoRetiros + '/' + usuario, { headers });
  }


  // /slv-preliquidador/api/preliquidador/getVersion
  // getVersion
  public getVersion(): Observable<string> {
    console.log('SERVICIO - preliquidador - getVersion');
    console.log(this.appSettings.URL_preliquidador_getVersion);
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    return this.http.get<string>
      (this.appSettings.URL_preliquidador_getVersion, { headers, responseType: 'text' as 'json' });
  }

  // preliquidador/getPrecioTituloMaximoParaCompensacion
  public getPrecioTituloMaximoParaCompensacion(): Observable<number> {
    console.log('SERVICIO - preliquidador - getPrecioTituloMaximoParaCompensacion');
    console.log(this.appSettings.URL_preliquidador_getPrecioTituloMaximoParaCompensacion);
    return this.http.get<number>
      (this.appSettings.URL_preliquidador_getPrecioTituloMaximoParaCompensacion, this.appSettings.httpOptionsJson);
  }

  // preliquidador/getMontoTotalActualInstrucciones
  public getMontoTotalActualInstrucciones(): Observable<number> {
    console.log('SERVICIO - preliquidador - getMontoTotalActualInstrucciones');
    console.log(this.appSettings.URL_preliquidador_getMontoTotalActualInstrucciones);
    return this.http.get<number>
      (this.appSettings.URL_preliquidador_getMontoTotalActualInstrucciones, this.appSettings.httpOptionsJson);
  }

  // preliquidador/getNumeroTotalActualInstrucciones
  public getNumeroTotalActualInstrucciones(): Observable<number> {
    console.log('SERVICIO - preliquidador - getNumeroTotalActualInstrucciones');
    console.log(this.appSettings.URL_preliquidador_getNumeroTotalActualInstrucciones);
    return this.http.get<number>
      (this.appSettings.URL_preliquidador_getNumeroTotalActualInstrucciones, this.appSettings.httpOptionsJson);
  }

  // preliquidador/getMontoTotalMaxInstrucciones
  public getMontoTotalMaxInstrucciones(): Observable<number> {
    console.log('SERVICIO - preliquidador - getMontoTotalMaxInstrucciones');
    console.log(this.appSettings.URL_preliquidador_getMontoTotalMaxInstrucciones);
    return this.http.get<number>
      (this.appSettings.URL_preliquidador_getMontoTotalMaxInstrucciones, this.appSettings.httpOptionsJson);
  }

  // preliquidador/getNumeroTotalMaxInstrucciones
  public getNumeroTotalMaxInstrucciones(): Observable<number> {
    console.log('SERVICIO - preliquidador - getNumeroTotalMaxInstrucciones');
    console.log(this.appSettings.URL_preliquidador_getNumeroTotalMaxInstrucciones);
    return this.http.get<number>
      (this.appSettings.URL_preliquidador_getNumeroTotalMaxInstrucciones, this.appSettings.httpOptionsJson);
  }

  // preliquidador/getNumeroAdaptableMaxInstrucciones
  public getNumeroAdaptableMaxInstrucciones(): Observable<number> {
    console.log('SERVICIO - preliquidador - getNumeroAdaptableMaxInstrucciones');
    console.log(this.appSettings.URL_preliquidador_getNumeroAdaptableMaxInstrucciones);
    return this.http.get<number>
      (this.appSettings.URL_preliquidador_getNumeroAdaptableMaxInstrucciones, this.appSettings.httpOptionsJson);
  }

  // preliquidador/isGatilloDinamicoActivo
  public isGatilloDinamicoActivo(): Observable<boolean> {
    console.log('SERVICIO - preliquidador - isGatilloDinamicoActivo');
    console.log(this.appSettings.URL_preliquidador_isGatilloDinamicoActivo);
    return this.http.get<boolean>
      (this.appSettings.URL_preliquidador_isGatilloDinamicoActivo, this.appSettings.httpOptionsJson);
  }

  // preliquidador/isReencoladoAutomatico
  public isReencoladoAutomatico(): Observable<boolean> {
    console.log('SERVICIO - preliquidador - isReencoladoAutomatico');
    console.log(this.appSettings.URL_preliquidador_isReencoladoAutomatico);
    return this.http.get<boolean>
      (this.appSettings.URL_preliquidador_isReencoladoAutomatico, this.appSettings.httpOptionsJson);
  }

  // preliquidador/getNumeroInstruccionesRetirosEfectivo
  public getNumeroInstruccionesRetirosEfectivo(): Observable<number> {
    console.log('SERVICIO - preliquidador - getNumeroInstruccionesRetirosEfectivo');
    console.log(this.appSettings.URL_preliquidador_getNumeroInstruccionesRetirosEfectivo);
    return this.http.get<number>
      (this.appSettings.URL_preliquidador_getNumeroInstruccionesRetirosEfectivo, this.appSettings.httpOptionsJson);
  }

  // preliquidador/getNumeroInstruccionesCompuestas
  public getNumeroInstruccionesCompuestas(): Observable<number> {
    console.log('SERVICIO - preliquidador - getNumeroInstruccionesCompuestas');
    console.log(this.appSettings.URL_preliquidador_getNumeroInstruccionesCompuestas);
    return this.http.get<number>
      (this.appSettings.URL_preliquidador_getNumeroInstruccionesCompuestas, this.appSettings.httpOptionsJson);
  }

  // preliquidador/getNumeroInstruccionesCompensables
  public getNumeroInstruccionesCompensables(): Observable<number> {
    console.log('SERVICIO - preliquidador - getNumeroInstruccionesCompensables');
    console.log(this.appSettings.URL_preliquidador_getNumeroInstruccionesCompensables);
    return this.http.get<number>
      (this.appSettings.URL_preliquidador_getNumeroInstruccionesCompensables, this.appSettings.httpOptionsJson);
  }

  // preliquidador/isLiquidacionFinDeDiaActivada
  public isLiquidacionFinDeDiaActivada(): Observable<boolean> {
    console.log('SERVICIO - preliquidador - isLiquidacionFinDeDiaActivada');
    console.log(this.appSettings.URL_preliquidador_isLiquidacionFinDeDiaActivada);
    return this.http.get<boolean>
      (this.appSettings.URL_preliquidador_isLiquidacionFinDeDiaActivada, this.appSettings.httpOptionsJson);
  }

  // preliquidador/isLimitarRetiros
  public isLimitarRetiros(): Observable<boolean> {
    console.log('SERVICIO - preliquidador - isLimitarRetiros');
    console.log(this.appSettings.URL_preliquidador_isLimitarRetiros);
    return this.http.get<boolean>
      (this.appSettings.URL_preliquidador_isLimitarRetiros, this.appSettings.httpOptionsJson);
  }

  // preliquidador/getNumeroMaximoRetiros
  public getNumeroMaximoRetiros(): Observable<number> {
    console.log('SERVICIO - preliquidador - getNumeroMaximoRetiros');
    console.log(this.appSettings.URL_preliquidador_getNumeroMaximoRetiros);
    return this.http.get<number>
      (this.appSettings.URL_preliquidador_getNumeroMaximoRetiros, this.appSettings.httpOptionsJson);
  }

  // preliquidador/isSlvCerrado
  public isSlvCerrado(): Observable<boolean> {
    console.log('SERVICIO - preliquidador - isSlvCerrado');
    console.log(this.appSettings.URL_preliquidador_isSlvCerrado);
    return this.http.get<boolean>
      (this.appSettings.URL_preliquidador_isSlvCerrado, this.appSettings.httpOptionsJson);
  }

  // preliquidador/isDiaInhabil
  public isDiaInhabil(): Observable<boolean> {
    console.log('SERVICIO - preliquidador - isDiaInhabil');
    console.log(this.appSettings.URL_preliquidador_isDiaInhabil);
    return this.http.get<boolean>
      (this.appSettings.URL_preliquidador_isDiaInhabil, this.appSettings.httpOptionsJson);
  }





  /*
      const headers = new HttpHeaders().append('header', 'value');
      const params = new HttpParams().append('param', 'value');
      this.http.get('url', {headers, params});
  */
}
