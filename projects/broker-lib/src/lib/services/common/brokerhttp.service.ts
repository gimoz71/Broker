import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

import { Http } from "../../models/common/http.namespace";

import { ConstantsService } from "./constants.service";


@Injectable()
export class BrokerHttpService {

    constructor(
        private http: HttpClient,
        private constants: ConstantsService) {}

    public get(path: string, tokenValue: string): Observable<Http.HttpResponse> {
        // vado a sostituire il placeholder con il token che ho in sesssione (se c"è) prima di fare qualsiasi chiamata get al server
        console.log("HttpService get " + path);
        const headers = this.getCallHeaders(tokenValue);
        return this.http.get<Http.HttpResponse>(this.constants.baseAppUrl + "/" + path, {headers});
    }

    public getNoToken(path: string): Observable<Http.HttpResponse> {
        // vado a sostituire il placeholder con il token che ho in sesssione (se c"è) prima di fare qualsiasi chiamata get al server
        console.log("HttpService get " + path);
        return this.http.get<Http.HttpResponse>(this.constants.baseAppUrl + "/" + path);
    }

    public post(path: string, body: any, tokenValue: string): Observable<Http.HttpResponse> {
        console.log("HttpService post " + path);
        const headers = this.getCallHeaders(tokenValue);
        return this.http.post<Http.HttpResponse>(this.constants.baseAppUrl + "/" + path, body, {headers});
    }

    public postNoToken(path: string, body: any): Observable<Http.HttpResponse> {
        console.log("HttpService post " + path);
        return this.http.post<Http.HttpResponse>(this.constants.baseAppUrl + "/" + path, body);
    }

    private getCallHeaders(tokenValue: string): HttpHeaders {
        const httpHeaders = new HttpHeaders();
        httpHeaders.set(this.constants.tokenHeaderKey, tokenValue);
        return httpHeaders;
    }
}
