import { Component, OnInit } from '@angular/core';
import { LoginRequest } from './login-class/loginRequest';
import { LoginResponse } from './login-class/loginResponse';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import swal from 'sweetalert2';
import { AppStorageService } from '../app-storage-service';
import { Usuario } from './login-class/usuario';
import { UserResponse } from './login-class/userResponse';
import { AppSettings } from '../app-settings';

export interface FormModel {
  username?: string;
  captcha?: string;
  password?: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formModel: FormModel = {};

  public formLogin: FormGroup;
  public loginRequest = new LoginRequest();
  private loginResponse = new LoginResponse();
  private msg = '';
  public hidePass = true;
  aux = { requiereCaptcha: false };
  us: Usuario = new Usuario();
  private usResponse = new UserResponse();
  captchaStatus = false;

  constructor(private spinnerService: NgxSpinnerService,
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private appStorageService: AppStorageService,
    private appSettings: AppSettings) {

    this.crearFormulario();
    this.appStorageService.logout();
  }

  // tslint:disable-next-line: typedef
  setRequired() {
    return [Validators.required];
  }

  ngOnInit(): void {
    console.log('requiereCaptcha ' + this.aux.requiereCaptcha);
    this.spinnerService.hide();
    this.formLogin.controls.captcha.clearValidators();
    this.servicioCaptcha();
  }

  servicioCaptcha(): void {
    this.spinnerService.show();
    this.loginService.cargaInicial().subscribe(
      response => {
        console.log('RES = ' + response);
        this.spinnerService.hide();
        this.aux.requiereCaptcha = response.respuesta;
        console.log('requiereCaptcha ' + this.aux.requiereCaptcha);
        if (this.aux.requiereCaptcha) {
          this.formLogin.controls.captcha.setValidators([Validators.required]);
          this.captchaStatus = true;
        }
      }, err => {
        this.spinnerService.hide();
        console.error(err.error.message);
      });
  }

  crearFormulario(): void {
    this.formLogin = this.fb.group({
      username: ['indevaldrp', [Validators.required]],
      password: ['pruebhaq', [Validators.required]],
      captcha: [null]
    });
  }

  /*
    username: ['omarnl', [Validators.required]],
    password: ['asff2', [Validators.required]]
  */
  ingresar(): void {
    console.log('Ingresando');
    console.log(this.formLogin);
    this.loginRequest.username = this.formLogin.get('username').value;
    this.loginRequest.password = this.formLogin.get('password').value;
    this.login();
    // this.callService();
    // this.router.navigate(['/slv']);
  }

  login(): void {
    this.spinnerService.show();
    this.us.sistema = this.appSettings.sistema;
    this.us.sistemaCaptcha = this.aux.requiereCaptcha;
    this.us.usuario = this.formLogin.get('username').value;
    this.us.password = this.formLogin.get('password').value;
    this.us.captchaStatus = this.captchaStatus;
    console.log('>> US ' + this.us);
    /*this.serviceLogin.obtenertoken(this.us).subscribe(
      response => {*/
    this.loginService.getLogin(this.us).subscribe(
      response => {
        console.log('RES-login ' + response);
        if (response.status) {
          this.us.token = response.respuesta.token.token;
          this.usResponse = response;
          // if (this.usResponse.tipoAutenticacion == 4) {
            this.spinnerService.hide();
            this.appStorageService.setPerfil(this.us.usuario);
            this.appStorageService.setUserName(this.us.usuario);
            this.appStorageService.setTicket(this.usResponse.ticket);
            this.appStorageService.setToken(this.us.token);
            const aux = (response.respuesta.timeToken - 1);
            this.appStorageService.setTimerToken(aux + '');
            // this.appStorageService.setTimerToken('1');
            this.appStorageService.setTimerTicket(response.respuesta.timeTicket);
            this.router.navigate(['/slv']);
         // } else {
           /*
            this.spinnerService.hide();
            this.appStorageService.setPerfil(this.us.usuario);
            this.appStorageService.setUserName(this.us.usuario);
            this.appStorageService.setTicket(this.usResponse.ticket);
            this.appStorageService.setToken(this.us.token);
            this.router.navigate(['/slv']);
            */
         // }
        } else {
          this.msg = response.msg;
          swal.fire({
            icon: 'error',
            title: 'Autentificación Fallida',
            text: this.msg
          });
        }
      }, error => {
        this.spinnerService.hide();
        // toastr.error(error.error.msg, 'Error');
        console.error('ERROR AL RECUPERAR EL USUARIO - (LoginComponent)');
        swal.fire({
          icon: 'error',
          title: 'Autentificación Fallida',
          text: this.msg
        });
        console.error(error.error.message);
      });
  }

  // LLAMADO DEL SERVICIO
  private callService(): void {
    this.spinnerService.show();
    this.loginService.getLogin2(this.loginRequest)
      .subscribe(
        data => {
          this.loginResponse = data;
          console.log(this.loginResponse);
          this.validUser();
          this.spinnerService.hide();
        },
        error => {
          this.spinnerService.hide();
          this.msg = 'En este momento no podemos ingresar, inténtelo en otro momento.';
          console.error('ERROR AL RECUPERAR EL USUARIO - (LoginComponent)');
          swal.fire({
            icon: 'error',
            title: 'Autentificación Fallida',
            text: this.msg
          });
        });
  }

  // VALIDANDO LA RESPUESTA DEL SERVICIO
  private validUser(): void {
    if (this.loginResponse.token != '') {
      console.log('Usuario entro correctamente');
      this.appStorageService.setToken(this.loginResponse.token);
      this.appStorageService.setUserName(this.loginRequest.username);
      console.log(this.appStorageService.getToken);
      this.callServiceTest();
      this.router.navigate(['/slv']);
    } else {
      this.msg = this.loginResponse.msg;
      swal.fire({
        icon: 'error',
        title: 'Autentificación Fallida',
        text: this.msg
      });
    }
  }


  // LLAMADO DEL SERVICIO TEST
  private callServiceTest(): void {
    this.spinnerService.show();
    this.loginService.getTest()
      .subscribe(
        data => {
          this.loginResponse = data;
          console.log(this.loginResponse);
        },
        error => {
          this.spinnerService.hide();
          this.msg = 'En este momento no podemos ingresar, inténtelo en otro momento.';
          console.error('ERROR AL RECUPERAR INFORMACION - (LoginComponent)');
          swal.fire({
            icon: 'error',
            title: 'Autentificación Fallida',
            text: this.msg
          });
        });
  }

}
