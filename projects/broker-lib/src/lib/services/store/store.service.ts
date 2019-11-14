import { Injectable } from "@angular/core";
import { Utente } from '../../models/login/utente';
import { Storage } from '@ionic/Storage';
import { WsToken } from '../../models/login/wsToken';

@Injectable()
export class StoreService {

    private USERKEY = "user";

    private ws_token: WsToken;

    constructor(private storage: Storage) {
        this.ws_token = null;
    }

    public setUserData(ws_token: WsToken): number {
        console.log("setUserData");
        this.ws_token = ws_token;
        if (ws_token != null) {
            this.storage.set(this.USERKEY, ws_token).then((val) => {
                console.log(val);
            });
        } else {
            return -1;
        }
        return 1;
    }

    public getUserDataPromise() {
        return new Promise(resolve => {
            if (this.ws_token == null) {
                // store service prima inizializzaione
                this.storage.get(this.USERKEY).then((val: WsToken) => {
                    // recuperato token dal database
                    console.log(val);
                    if (val != null) {
                        resolve(val);
                        // eventuale controllo la validità del token
                        // se non è valido devo eseguire di nuovo il login (vedere app Gisco).
                        // verificare se esiste un servizio per il controllo di validità del token

                        // this.check.checkToken(this.serverUrl, val.token_value).subscribe(
                        //     (r)=>{
                        // console.log(r);
                        // token corretto lo invio
                        //         if (r.ErrorMessage.msg_code == 0){
                        //             resolve(val);
                        //         }else{
                        //             //token non corretto faccio il login
                        //             this.login.login(this.serverUrl, val.token_user, val.token_password).subscribe(
                        //                 (rl : Login.ws_Token)=>{
                        //                     console.log(rl);
                        //                         console.log("log userdata 1");
                        //                     if (rl.ErrorMessage.msg_code == 0){
                        //                             this.setUserData(rl);
                        //                             this.ud = rl;
                        //                             resolve(rl)
                        //                     }else{
                        //                         console.log("errore login 4");
                        //                         this.setUserData(null);
                        //                          this.ud = null;
                        //                         resolve(null);
                        //                     }
                        //                 }
                        //             );
                        //         }
                        //         }
                        //     );
                        // }
                    } else {
                        console.log("necessario login");
                        this.setUserData(null);
                        this.ws_token = null;
                        // devo andare alla pagina del login
                        resolve(null);
                    }
                }
                );
            } else {
                // store service già inizializzato

                // come al punto precedente servirebbe controllare il token ed eventualmente fare di nuovo il login;

                resolve(this.ws_token);

                // this.check.checkToken(this.serverUrl, this.ud.token_value).subscribe(
                //     //check sul token
                //     (r: Login.ws_Token)=>{
                //         //token valido lo invio
                //         if (r.ErrorMessage.msg_code == 0){
                //             resolve(this.ud);
                //         }else{
                //             this.login.login(this.serverUrl, this.ud.token_user, this.ud.token_password).subscribe(
                //                 //token non valido faccio il login
                //                (rl : Login.ws_Token)=>{
                //                 console.log("log userdata 3");
                //                 console.log(rl);
                //                    if (rl.ErrorMessage.msg_code == 0){
                //                     this.setUserData(rl);
                //                     this.ud = rl;
                //                     resolve(rl);
                //                    }else{
                //                         resolve (null);
                //                         this.setUserData(null);
                //                         this.ud = null;
                //                        console.log("login non riuscito 1");
                //                    }
                //                }
                //             );
                //         }
                //     }
                // )
            }
        });
    }
}
