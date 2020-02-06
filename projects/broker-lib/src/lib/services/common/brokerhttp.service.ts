import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpBackend } from "@angular/common/http";

import { Observable } from "rxjs";

import { Http } from "../../models/common/http.namespace";

import { ConstantsService } from "./constants.service";

import { timeout } from "rxjs/operators";


@Injectable()
export class BrokerHttpService {

    private httpClientLogin: HttpClient;

    constructor(
        private http: HttpClient,
        private constants: ConstantsService,
        private backEnd: HttpBackend) {
        this.httpClientLogin = new HttpClient(this.backEnd);
    }

    public get(path: string): Observable<Http.HttpResponse> {
        return this.http.get<Http.HttpResponse>(this.constants.baseAppUrl + "/" + path).pipe(
            timeout(this.constants.httpTimeout)
        );
    }

    public getNoToken(path: string): Observable<Http.HttpResponse> {
        console.log("HttpService get " + path);
        return this.httpClientLogin.get<Http.HttpResponse>(this.constants.baseAppUrl + "/" + path).pipe(
            timeout(this.constants.httpTimeout)
        );
    }

    public post(path: string, body: any): Observable<Http.HttpResponse> {
        return this.http.post<Http.HttpResponse>(this.constants.baseAppUrl + "/" + path, body).pipe(
            timeout(this.constants.httpTimeout)
        );
    }

    public postNoToken(path: string, body: any): Observable<Http.HttpResponse> {
        console.log("HttpService post " + path);
        return this.httpClientLogin.post<Http.HttpResponse>(this.constants.baseAppUrl + "/" + path, body).pipe(
            timeout(this.constants.httpTimeout)
        );
    }

}
