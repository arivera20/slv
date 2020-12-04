import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppStorageService } from './app-storage-service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private appStorageService: AppStorageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // const token: string = localStorage.getItem('token');
    const token: string = this.appStorageService.getToken();
    let request = req;
    // console.log('>>>>> Interceptor == ' + token);

    //if (token != null && token != '' ) {
    if (token) {
      // console.log('>>>>> Entro a modificar el request == ' + token);
      request = req.clone({
        //responseType: 'text' as 'json',
        setHeaders: {
          authorization: `Bearer ${ token }`
        }
      });
    }

    return next.handle(request);
  }
}
