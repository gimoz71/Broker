import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Http } from "../../models/common/http.namespace";
import { LoginRequest } from "../../models/login/loginRequest";
import { CambioPasswordRequest } from "../../models/login/cambioPasswordRequest";

import { BrokerHttpService } from "../common/brokerhttp.service";
import { WsToken } from '../../models/login/wsToken';
import { StoreService } from '../store/store.service';
import { ConstantsService } from '../common/constants.service';

@Injectable()
export class LoginService {
    constructor(
        private httpService: BrokerHttpService,
        private storeService: StoreService,
        private constants: ConstantsService) {
    }

    public CambioPassword(bodyCambio: CambioPasswordRequest) {
        return this.httpService.post(this.constants.cambioPasswordServiceName, bodyCambio);
    }

    public Login(body: LoginRequest): Observable<Http.HttpResponse> {
        // eseguo la post
        return this.httpService.postNoToken(this.constants.loginServiceName, body);
    }

    // public Login(body: LoginRequest): Observable<Http.HttpResponse> { // momentaneamente in get per usare il servizio finto di test
    //     // eseguo la post
    //     return this.httpService.getNoToken(this.constants.loginServiceName);
    // }

    /*
    QUESTA è LA LOGICA DA METTERE SUL CHIAMANTE DELLA LOGIN
    .subscribe(r => {

            let response = new WsToken();
            if (r.Success) {
                response = r.Data;
                this.storeService.setUserData(response); // eventuale controllo su esito salvataggio in sessione
            } else {
                let errorMessage = r.ErrorMessage;

                // invio al server dell'errore

                // popup errore
            }

        });
    } */
}
