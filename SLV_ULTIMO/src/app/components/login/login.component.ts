import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import swal from 'sweetalert2';
import { LoginRequest } from './login-class/loginRequest';
import { LoginResponse } from './login-class/loginResponse';
import { AppStorageService } from '../app-storage-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppSettings } from '../app-settings';
import { UserResponse } from './login-class/userResponse';
import { Usuario } from './login-class/usuario';

declare var $: any;
declare var toastr: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginRequest = new LoginRequest();
  private loginResponse: LoginResponse;
  private usResponse = new UserResponse();
  private msg = '';

  usuarioForm = new FormControl('', [
    Validators.required,
  ]);

  msgErrorCaptcha = false;
  aux = { requiereCaptcha: false };
  us: Usuario = new Usuario();
  hidePassModal = true;
  hidePass = true;
  captchaStatus = false;

  constructor(private loginService: LoginService,
    private router: Router,
    private serviceLogin: LoginService,
    private appStorageService: AppStorageService,
    private spinnerService: NgxSpinnerService,
    private appSettings: AppSettings) { }

  ngOnInit(): void {
    this.spinnerService.show();
    this.serviceLogin.cargaInicial().subscribe(
      response => {
        this.spinnerService.hide();
        this.aux.requiereCaptcha = response.respuesta;
      }, err => {
        this.spinnerService.hide();
        console.error(err.error.message);
      });

    toastr.options.closeButton = true;
    toastr.options.showMethod = 'slideDown';
    toastr.options.hideMethod = 'slideUp';
    toastr.options.closeMethod = 'slideUp';
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
    if (captchaResponse != null) {
      this.captchaStatus = true;
    } else {
      this.captchaStatus = false;
    }
  }

  login() {
    this.spinnerService.show();
    this.us.sistema = this.appSettings.sistema;
    this.us.sistemaCaptcha = this.aux.requiereCaptcha;
    this.us.captchaStatus = this.captchaStatus;
    /*
    this.appStorageService.setTimerToken('1');
    this.router.navigate(['/slv']);
    */
    this.serviceLogin.getLogin(this.us).subscribe(
      response => {
        if (response.status) {
          this.us.token = response.respuesta.token.token;
          this.usResponse = response;
          this.appStorageService.setPerfil(this.us.usuario);
          this.appStorageService.setUserName(this.us.usuario);
          const aux = (response.respuesta.timeToken - 1);
          this.appStorageService.setTimerToken(aux + '');
          this.appStorageService.setTimerTicket(response.respuesta.timeTicket);
          this.appStorageService.setTicket(this.usResponse.ticket);
          this.appStorageService.setToken(this.us.token);
          this.router.navigate(['/slv']);
        }
        else {
          this.spinnerService.hide();
          toastr.error(response.msg, 'Error');
        }
      }, error => {
        this.spinnerService.hide();
        toastr.error(error.error.msg, 'Error');
        console.error('ERROR AL RECUPERAR EL USUARIO - (LoginInitComponent)');
        swal.fire({
          icon: 'error',
          title: 'Autentificación Fallida',
          text: this.msg
        });
        console.error(error.error.message);
      });
  }

  firmar() {
    if (this.us != null) {
      if (this.us.contraseniaCert === '1234') {
        $("#abrirCertificado").modal("hide");
        this.appStorageService.setPerfil(this.us.usuario);
        this.appStorageService.setUserName(this.us.usuario);
        this.appStorageService.setTicket(this.usResponse.ticket);
        this.router.navigate(['/conciliacion']);
      } else {
        toastr.error('Las credenciales son incorrectas', 'Error')
      }
    }
  }

  fileChange(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('uploadFile', file, file.name);
      let headers = new Headers();

      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');
    }
  }


}
