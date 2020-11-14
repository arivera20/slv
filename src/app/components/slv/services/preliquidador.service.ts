import { Injectable } from '@angular/core';
import { AppSettings } from '../../app-settings';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreliquidadorService {

  constructor(private http: HttpClient, private appSettings: AppSettings) { }

  // getVersion
  public getVersion(): Observable<string> {
    console.log('SERVICIO - preliquidador - getVersion');
    console.log(this.appSettings.URL_preliquidador_getVersion);
    return this.http.get<string>
      (this.appSettings.URL_preliquidador_getVersion, this.appSettings.httpOptionsJson);
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

}