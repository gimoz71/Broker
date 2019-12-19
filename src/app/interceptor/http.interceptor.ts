import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SessionService, WsToken, AlertService } from 'broker-lib';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';

@Injectable()
export class RaHttpInterceptor implements HttpInterceptor {

    public wsToken: WsToken;
    public loaderToShow: any;
    public presentLoader = true;

    constructor(
        public sessionService: SessionService,
        public router: Router,
        public alertService: AlertService,
        public loadingController: LoadingController
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const tokenValue = 'Bearer ' + this.sessionService.getUserData().token_value;
        request = request.clone({
            headers: new HttpHeaders({
                Authorization: tokenValue,
                "Content-Type": "application/json"
            })
        });
        this.showLoader();
        return next.handle(request).pipe(map((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                console.log('event--->>>', event);
            }
            // setTimeout(() => { this.hideLoader(); }, 3000); // <-- usare questa per testare il loader se la connessione è troppo veloce
            this.presentLoader = false;
            this.hideLoader();
            return event;
        }), catchError((x: HttpErrorResponse) => {
            this.presentLoader = false;
            this.hideLoader();
            return this.handleAuthError(x);
        })); // here use an arrow function, otherwise you may get "Cannot read property 'navigate' of undefined" on angular 4.4.2/net core 2/webpack 2.70;
    }

    private handleAuthError(err: any): Observable<any> {

        // ---------- QUI SI DEVONO MAPPARE TUTTI I POSSIBILI ERRORI HTTP E IMPLEMENTARE LE CONSEGUENTI AZIONI

        console.log('interceptor --->>> handling error: ' + err.status + ' ' + err.message);
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

    showLoader() {
        this.loaderToShow = this.loadingController.create({
            message: 'Attedere prego...'
        }).then((res) => {
            if (this.presentLoader) {
                res.present();
                res.onDidDismiss().then((dis) => {
                    console.log('Loading dismissed!');
                });
            } else {
                res.dismiss();
            }
        });
        // this.hideLoader();
    }

    hideLoader() {
        this.loadingController.dismiss();
    }

}
