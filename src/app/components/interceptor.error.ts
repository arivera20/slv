import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpRequest, HttpInterceptor } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/internal/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
    providedIn: 'root'
})
export class InterceptorError implements HttpInterceptor {

    constructor(private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(req).pipe(
            catchError(error => {
                let errorMessage = '';
                console.log('ERROR = ' + error.status);
                if (error.status == 403) {
                    this.router.navigate(['login']);
                } else {
                    if (error instanceof ErrorEvent) {
                        // client-side error
                        errorMessage = `Client-side error: ${error.error.message}`;
                    } else {
                        // backend error
                        errorMessage = `Server-side error: ${error.status} ${error.message}`;
                    }

                    // aquí podrías agregar código que muestre el error en alguna parte fija de la pantalla.
                    // this.errorService.show(errorMessage);
                    return throwError(errorMessage);
                }
            })
        );
    }
}
