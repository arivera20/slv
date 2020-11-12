import { Component, OnInit } from '@angular/core';
import { LoginRequest } from './login-class/loginRequest';
import { LoginResponse } from './login-class/loginResponse';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import swal from 'sweetalert2';
import { AppStorageService } from '../app-storage-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formLogin: FormGroup;
  public loginRequest = new LoginRequest();
  private loginResponse = new LoginResponse();
  private msg = '';
  public hidePass = true;

  constructor(private spinnerService: NgxSpinnerService,
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private appStorageService: AppStorageService) {

    this.crearFormulario();
  }

  ngOnInit(): void {
  }


  crearFormulario(): void {

    this.formLogin = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ingresar(): void {
    console.log('Ingresando');
    console.log(this.formLogin);
    this.loginRequest.username = this.formLogin.get('username').value;
    this.loginRequest.password = this.formLogin.get('password').value;
    console.log(this.loginRequest);
    //this.callService();
    this.router.navigate(['/slv']);
  }

  // LLAMADO DEL SERVICIO
  private callService(): void {
    this.spinnerService.show();
    this.loginService.getLogin(this.loginRequest)
      .subscribe(
        data => {
          this.loginResponse = data;
          console.log(this.loginResponse);
          this.validUser();
          this.spinnerService.hide();
        },
        error => {
          this.spinnerService.hide();
          this.msg = 'En este momento no podemos ingresar, intentelo en otro momento.';
          console.error('ERROR AL RECUPERAR EL USUARIO - (LoginInitComponent)');
          swal.fire({
            icon: 'error',
            title: 'Autentificación Fallida',
            text: this.msg
          });
        });
  }

  // VALIDANDO LA RESPUESTA DEL SERVICIO
  private validUser(): void {
    if (this.loginResponse.status == true) {
      console.log('Usuario entro correctamente');
      this.appStorageService.setToken(this.loginResponse.token);
      console.log(this.appStorageService.getToken);
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

}
