import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SessionService, WsToken, AlertService } from 'broker-lib';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class RaHttpInterceptor implements HttpInterceptor {

    public wsToken: WsToken;

    constructor(
        public sessionService: SessionService,
        public router: Router,
        public alertService: AlertService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const tokenValue = 'Bearer ' + this.sessionService.getUserData().token_value;
        request = request.clone({
            headers: new HttpHeaders({
                Authorization: tokenValue,
                "Content-Type": "application/json"
            })
        });
        return next.handle(request).pipe(catchError(x => this.handleAuthError(x))); // here use an arrow function, otherwise you may get "Cannot read property 'navigate' of undefined" on angular 4.4.2/net core 2/webpack 2.70;
    }

    private handleAuthError(err: HttpErrorResponse): Observable<any> {
        // handle your auth error or rethrow
        if (err.status === 401 || err.status === 403) {
            // navigate /delete cookies or whatever
            this.alertService.presentErrorAlert("Utente non autorizzato o Token scaduto, necessario Login");
            this.sessionService.clearUserData();
            this.router.navigate(['login']);
            // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
            return of(err.message); // or EMPTY may be appropriate here
        }
        return throwError(err);
    }

}
