import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { SlvComponent } from './components/slv/slv.component';

import { NgxSpinnerModule } from 'ngx-spinner';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './components/interceptor.service';
import { InterceptorError } from './components/interceptor.error';

import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';

import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    AppComponent,
    SlvComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule, NgxSpinnerModule,
    BrowserAnimationsModule,
    MatSliderModule, MatCheckboxModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, MatIconModule,
    ReactiveFormsModule, FormsModule,
    HttpClientModule,
    RecaptchaModule, RecaptchaFormsModule,
    NgIdleKeepaliveModule.forRoot(),
    ModalModule.forRoot(),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorError, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
