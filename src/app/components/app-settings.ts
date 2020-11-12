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
  readonly urlLOGIN: string = 'http://10.150.201.205:8380/slv-persistidor/api/auth';






  // URL para Login
  private readonly urlAPP: string = 'http://127.0.0.1:8091/RestService/';
  // URL menu

  
  readonly urlMENU: string = 'http://localhost:4540/api/getMenu';
  
  readonly urlTABLE: string = 'http://localhost:4540/api/table';
  readonly urlCONCILIACION: string = 'http://localhost:4540/api/getConciliacion';














  //BASE = "http://9.9.10.197:7070/BtoVsuperUsersDAORest-dev",
  public static BASE = "http://127.0.0.1:8088/BtoVsuperUsersDAORest-dev";
  public static AGROUP = "/AgroupSups";
  public static LOGIN = "/login";
  public static PROFILE = "/Profile";
  public static RELSUPAGROUP = "/RelSupsAgroup";
  public static SUPS = "/Sups";
  public static USER = "/User";
  public static MENU = "/menu";

  // Configuracion HEADERS
  public static readonly HTTP_HEADERS_APPLICATION_JSON = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };



  readonly httpOptionsText = {
    headers: new HttpHeaders({ 'Content-Type': 'text/plain' })
  };

  // Validaciones para los formularios
  public static readonly VALIDATION_PATTERN_OF_NAMES = '^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\\s]*)$';
  public static readonly VALIDATION_PATTERN_OF_EMAIL = '^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$';
  public static readonly VALIDATION_PATTERN_OF_CURP = '^[A-Za-z]{4}[0-9]{6}[MHmh]{1}[A-Za-z]{2}[A-Za-z]{3}[0-9]{2}$';
  public static readonly VALIDATION_PATTERN_OF_RFC = '^[A-Za-z]{4}[0-9]{6}[A-Za-z0-9]{3}$';


  public static readonly IP_ISS = 'http://192.168.138.8/';
  public static readonly IP_BENEFITS = 'http://192.168.138.29:8096/';
  public static readonly IP_ASSETS = 'http://192.168.138.29:8096/';

  // IDS DE LAS APLICACIONES DE FACEBOOK Y GOOGLE PARA EL INICIO DE SESION
  public static readonly FACEBOOK_APP_ID = '1477564509019113';
  public static readonly GOOGLE_APP_ID = 'http://localhost:8096/';

  // TIPOS DE CONTENIDO PARA LA DESCARGA DE ARCHIVOS
  public static readonly CONTENT_TYPE_PDF = 'application/pdf';
  public static readonly CONTENT_TYPE_EXCEL = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

  // Direcciones de Archivos
  public static readonly URL_DEFAULT_USER_IMAGE = '/assets/images/dash/img-perfil.png';

  // QUOTE - VARIABLES
  private readonly urlQuoteModuleApi: string = 'http://192.168.138.8/apimovil/api/catalogs/';
  readonly urlGetUseVehicle: string = this.urlQuoteModuleApi + 'usetype';
  readonly urlGetCategories: string = this.urlQuoteModuleApi + 'categories';
  readonly urlPostModel: string = this.urlQuoteModuleApi + 'model';
  readonly urlPostBrand: string = this.urlQuoteModuleApi + 'brand';
  readonly urlPostSubBrand: string = this.urlQuoteModuleApi + 'subbrand';
  readonly urlPostVersion: string = this.urlQuoteModuleApi + 'version';
  readonly urlGetPlan: string = this.urlQuoteModuleApi + 'plan';
  readonly urlGetPayment: string = this.urlQuoteModuleApi + 'paymentmethod';
  //readonly urlPostQuote: string = 'http://192.168.138.37:50746/api/quotation/quotation';
  readonly urlPostQuote: string = 'http://192.168.138.8/apimovil/api/quotation/quotation';
  readonly urlPostProtection: string = 'http://192.168.138.8:8096/api/assets/levelProtection';
  readonly urlGetCaptchaData: string = 'http://192.168.138.8/apimovil/api/captcha/data';

}
