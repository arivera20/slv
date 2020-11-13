import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { SlvComponent } from './components/slv/slv.component';

import { NgxSpinnerModule } from 'ngx-spinner';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSliderModule} from '@angular/material/slider';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';


import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './components/interceptor.service';

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
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
