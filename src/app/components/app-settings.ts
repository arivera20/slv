import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppSettings {


  // ERROR - HANDLER
  public catchError(error): void {
    let message;
    if (error instanceof HttpErrorResponse) {
      message = `>>>> Http "Status Error": ${error.status}, "text": ${error.statusText}, "message": ${error.message}`;
    } else {
      message = `>>>> Unknown error, text: ${error.message}`;
    }
    console.error(message);
  }

  readonly sistema = 'CONTROL_SLV';
  // readonly path = window.location.protocol + '//' + window.location.host + '/';
  readonly path = '';

  // httpOptionsJson
  readonly httpOptionsJson = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  readonly httpText = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
  // {responseType: 'text'}

  //readonly urlLOGIN: string = 'http://10.150.201.205:8380/slv-persistidor/api/auth';
  readonly urlLOGIN: string = 'slv-persistidor/api/auth';

  // http://10.150.201.205:8380/slv-preliquidador/api/compensadorController/isCompensadorActivo
  readonly urlTEST: string = 'slv-preliquidador/api/compensadorController/isCompensadorActivo';


  /** preliquidador */
  private readonly URL_preliquidador: string = 'slv-preliquidador/api/preliquidador/';
  readonly URL_preliquidador_getVersion = this.URL_preliquidador + 'getVersion';
  readonly URL_preliquidador_getPrecioTituloMaximoParaCompensacion: string = this.URL_preliquidador + 'getPrecioTituloMaximoParaCompensacion';
  readonly URL_preliquidador_getMontoTotalActualInstrucciones: string = this.URL_preliquidador + 'getMontoTotalActualInstrucciones';
  readonly URL_preliquidador_getNumeroTotalActualInstrucciones: string = this.URL_preliquidador + 'getNumeroTotalActualInstrucciones';
  readonly URL_preliquidador_getMontoTotalMaxInstrucciones: string = this.URL_preliquidador + 'getMontoTotalMaxInstrucciones';
  readonly URL_preliquidador_getNumeroTotalMaxInstrucciones: string = this.URL_preliquidador + 'getNumeroTotalMaxInstrucciones';
  readonly URL_preliquidador_getNumeroAdaptableMaxInstrucciones: string = this.URL_preliquidador + 'getNumeroAdaptableMaxInstrucciones';
  readonly URL_preliquidador_isGatilloDinamicoActivo: string = this.URL_preliquidador + 'isGatilloDinamicoActivo';
  readonly URL_preliquidador_isReencoladoAutomatico: string = this.URL_preliquidador + 'isReencoladoAutomatico';
  readonly URL_preliquidador_getNumeroInstruccionesRetirosEfectivo: string = this.URL_preliquidador + 'getNumeroInstruccionesRetirosEfectivo';
  readonly URL_preliquidador_getNumeroInstruccionesCompuestas: string = this.URL_preliquidador + 'getNumeroInstruccionesCompuestas';
  readonly URL_preliquidador_getNumeroInstruccionesCompensables: string = this.URL_preliquidador + 'getNumeroInstruccionesCompensables';
  readonly URL_preliquidador_isLiquidacionFinDeDiaActivada: string = this.URL_preliquidador + 'isLiquidacionFinDeDiaActivada';
  readonly URL_preliquidador_isLimitarRetiros: string = this.URL_preliquidador + 'isLimitarRetiros';
  readonly URL_preliquidador_getNumeroMaximoRetiros: string = this.URL_preliquidador + 'getNumeroMaximoRetiros';
  readonly URL_preliquidador_isSlvCerrado: string = this.URL_preliquidador + 'isSlvCerrado';
  readonly URL_preliquidador_isDiaInhabil: string = this.URL_preliquidador + 'isDiaInhabil';

  /** senalizadorPreliquidador */
  private readonly URL_senalizadorPreliquidador: string = 'slv-preliquidador/api/senalizadorPreliquidador/';
  readonly URL_senalizador_getEstadoSlv: string = this.URL_senalizadorPreliquidador + 'getEstadoSlv';
  readonly URL_senalizador_getFrecuenciaSlv: string = this.URL_senalizadorPreliquidador + 'getFrecuenciaSlv';
  readonly URL_senalizador_getFrecuenciaPurgadoSlv: string = this.URL_senalizadorPreliquidador + 'getFrecuenciaPurgadoSlv';
  readonly URL_senalizador_getFrecuenciaInicioValoresSlv: string = this.URL_senalizadorPreliquidador + 'getFrecuenciaInicioValoresSlv';
  readonly URL_senalizador_getFrecuenciaFinValoresSlv: string = this.URL_senalizadorPreliquidador + 'getFrecuenciaFinValoresSlv';
  readonly URL_senalizador_getFrecuenciaRecepcionSlv: string = this.URL_senalizadorPreliquidador + 'getFrecuenciaRecepcionSlv';
  readonly URL_senalizador_getFrecuenciaAperturaSlv: string = this.URL_senalizadorPreliquidador + 'getFrecuenciaAperturaSlv';
  readonly URL_senalizador_getFrecuenciaPreCierreSlv: string = this.URL_senalizadorPreliquidador + 'getFrecuenciaPreCierreSlv';
  readonly URL_senalizador_getFrecuenciaCierreSlv: string = this.URL_senalizadorPreliquidador + 'getFrecuenciaCierreSlv';
  readonly URL_senalizador_getFrecuenciaDiasLiq: string = this.URL_senalizadorPreliquidador + 'getFrecuenciaDiasLiq';

  /** compensador */
  private readonly URL_compensador: string = 'slv-preliquidador/api/compensadorController/';
  readonly URL_compensador_getTimeoutRespuesta: string = this.URL_compensador + 'getTimeoutRespuesta';
  readonly URL_compensador_isCompensadorActivo: string = this.URL_compensador + 'isCompensadorActivo';




}
