import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from './login-class/loginResponse';
import { LoginRequest } from './login-class/loginRequest';
import { Observable } from 'rxjs';
import { AppSettings } from '../app-settings';
import { Usuario } from './login-class/usuario';
import { AppStorageService } from '../app-storage-service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient,
    private appSettings: AppSettings,
    private appStorageService: AppStorageService) { }

  // Obtener token
  public getLogin2(dataInput: LoginRequest): Observable<LoginResponse> {
    console.log('Entre al servicio de login....' + dataInput.username);
    console.log(this.appSettings.urlLOGIN);
    return this.http.post<LoginResponse>
      (this.appSettings.urlLOGIN, dataInput, this.appSettings.httpOptionsJson);
  }

  // http://10.150.201.205:8380/slv-preliquidador/api/compensadorController/isCompensadorActivo
  // test
  public getTest(): Observable<LoginResponse> {
    console.log('Entre al servicio de test....');
    console.log(this.appSettings.urlTEST);
    return this.http.get<LoginResponse>
      (this.appSettings.urlTEST, this.appSettings.httpOptionsJson);
  }

  public cargaInicial(): Observable<any> {
    const urlCargaInicial = this.appSettings.path + 'slv-control-rest/api/login/isMostrarCaptchaSlv';
    console.log('prueba url: ' + urlCargaInicial);
    return this.http.get(urlCargaInicial, this.appSettings.httpOptionsJson);
  }

  /*
  public obtenertoken(us: Usuario): Observable<any> {
    const urlAuthLogin = this.appSettings.path + 'conciliacionRest/api/auth';
    return this.http.post(urlAuthLogin, us, this.appSettings.httpOptionsJson);
  }
  */

  public getLogin(us: Usuario): Observable<any> {
    const urlLogin = this.appSettings.path + 'slv-control-rest/api/login/determinaLogin';
    return this.http.post(urlLogin, us, this.appSettings.httpOptionsJson);
  }

  public cerrarSession(): Observable<any> {
    const response = {
      token: this.appStorageService.getToken,
      ticket: this.appStorageService.getTicket
    }
    const url = this.appSettings.path + 'slv-control-rest/api/login/logout';
    return this.http.post<any>(url, response, this.appSettings.httpOptionsJson);
  }
  public actualizaToken(): Observable<any> {
    const url = this.appSettings.path + 'slv-control-rest/api/login/actualizaToken';
    return this.http.get<any>(url, this.appSettings.httpHeadersToken());
  }
}
