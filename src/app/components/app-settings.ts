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

  // global - config
  readonly httpOptionsJson = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  // SLV URLs
  //readonly urlLOGIN: string = 'http://10.150.201.205:8380/slv-persistidor/api/auth';
  readonly urlLOGIN: string = 'slv-persistidor/api/auth';

  // http://10.150.201.205:8380/slv-preliquidador/api/compensadorController/isCompensadorActivo
  readonly urlTEST: string = 'slv-preliquidador/api/compensadorController/isCompensadorActivo';


  /** preliquidador */
  readonly URL_preliquidador_getVersion: string = 'slv-preliquidador/api/preliquidador/getVersion';
  readonly URL_preliquidador_getPrecioTituloMaximoParaCompensacion: string = 'slv-preliquidador/api/preliquidador/getPrecioTituloMaximoParaCompensacion';
  readonly URL_preliquidador_getMontoTotalActualInstrucciones: string = 'slv-preliquidador/api/preliquidador/getMontoTotalActualInstrucciones';






}
