import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpBackend } from "@angular/common/http";

import { Observable } from "rxjs";

import { Http } from "../../models/common/http.namespace";

import { ConstantsService } from "./constants.service";
import { SessionService } from './session.service';


@Injectable()
export class BrokerHttpService {

    private httpClientLogin: HttpClient;


    constructor(
        private http: HttpClient,
        private constants: ConstantsService,
        private backEnd: HttpBackend) {
        this.httpClientLogin = new HttpClient(this.backEnd);
    }

    public get(path: string, tokenValue: string): Observable<Http.HttpResponse> {
        // vado a sostituire il placeholder con il token che ho in sesssione (se c"è) prima di fare qualsiasi chiamata get al server
        // console.log("HttpService get " + path + " token: " + tokenValue);
        // const raHeaders = this.getCallHeaders(tokenValue);
        return this.http.get<Http.HttpResponse>(this.constants.baseAppUrl + "/" + path);
    }

    public getNoToken(path: string): Observable<Http.HttpResponse> {
        // vado a sostituire il placeholder con il token che ho in sesssione (se c"è) prima di fare qualsiasi chiamata get al server
        console.log("HttpService get " + path);
        return this.httpClientLogin.get<Http.HttpResponse>(this.constants.baseAppUrl + "/" + path);
    }

    public post(path: string, body: any, tokenValue: string): Observable<Http.HttpResponse> {
        // console.log("HttpService post " + path);
        // const headers = this.getCallHeaders(tokenValue);
        return this.http.post<Http.HttpResponse>(this.constants.baseAppUrl + "/" + path, body);
    }

    public postNoToken(path: string, body: any): Observable<Http.HttpResponse> {
        console.log("HttpService post " + path);
        return this.httpClientLogin.post<Http.HttpResponse>(this.constants.baseAppUrl + "/" + path, body);
    }

    private getCallHeaders(tokenValue: string) {

        const httpHeaders = new HttpHeaders({ 'Authorization': 'Bearer ' + tokenValue, 'Content-Type': 'application/json; charset=utf-8' });

        // const httpOptions = {
        //     headers: new HttpHeaders({
        //         'Authorization': 'Bearer ' + tokenValue
        //     })
        // };

        // const httpHeaders = new HttpHeaders();
        // const httpHeaders1 = httpHeaders.set('Content-Type', 'application/json; charset=utf-8');
        // const httpHeaders2 = httpHeaders1.set('Authorization', 'Bearer ' + tokenValue);
        return httpHeaders;
    }

    /*

    public get(path: string, tokenValue: string): Observable<Http.HttpResponse> {
        // vado a sostituire il placeholder con il token che ho in sesssione (se c"è) prima di fare qualsiasi chiamata get al server
        // console.log("HttpService get " + path + " token: " + tokenValue);
        // const raHeaders = this.getCallHeaders(tokenValue);
        return this.http.get<Http.HttpResponse>(this.sessionService.getConnection().url
            + this.sessionService.getConnection().pathseparator
            + path);
    }

    public getNoToken(path: string): Observable<Http.HttpResponse> {
        // vado a sostituire il placeholder con il token che ho in sesssione (se c"è) prima di fare qualsiasi chiamata get al server
        console.log("HttpService get " + path);
        return this.httpClientLogin.get<Http.HttpResponse>(this.sessionService.getConnection().url
            + this.sessionService.getConnection().pathseparator
            + path);
    }

    public post(path: string, body: any, tokenValue: string): Observable<Http.HttpResponse> {
        // console.log("HttpService post " + path);
        // const headers = this.getCallHeaders(tokenValue);
        return this.http.post<Http.HttpResponse>(this.sessionService.getConnection().url
            + this.sessionService.getConnection().pathseparator
            + path, body);
    }

    public postNoToken(path: string, body: any): Observable<Http.HttpResponse> {
        console.log("HttpService post " + path);
        return this.httpClientLogin.post<Http.HttpResponse>(this.sessionService.getConnection().url
            + this.sessionService.getConnection().pathseparator
            + path, body);
    }
    */
}
