import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { LoginResponse } from './login-class/loginResponse';
import { LoginRequest } from './login-class/loginRequest';
import { Observable } from 'rxjs';
import { AppSettings } from '../app-settings';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private appSettings: AppSettings) { }

    // Obtener token
    public getLogin(dataInput: LoginRequest): Observable<LoginResponse> {
      console.log('Entre al servicio de login....' + dataInput.username);
      console.log(this.appSettings.urlLOGIN);
      return this.http.post<LoginResponse>
            (this.appSettings.urlLOGIN, dataInput, this.appSettings.httpOptionsJson);
    }
}
