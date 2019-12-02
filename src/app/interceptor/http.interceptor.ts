import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SessionService, WsToken } from 'broker-lib';
import { Injectable } from '@angular/core';

@Injectable()
export class RaHttpInterceptor implements HttpInterceptor {

    public wsToken: WsToken;

    constructor(
        public sessionService: SessionService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const tokenValue = 'Bearer ' + this.sessionService.getUserData().token_value;
        request = request.clone({
            headers: new HttpHeaders({
                Authorization: tokenValue,
                "Content-Type": "application/json"
            })
        });
        return next.handle(request);
    }

}
