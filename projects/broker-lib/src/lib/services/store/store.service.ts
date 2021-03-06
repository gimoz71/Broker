import { Injectable } from "@angular/core";
import { Storage } from '@ionic/Storage';
import { WsToken } from '../../models/login/wsToken';
import { Cliente } from '../../models/clienti/cliente';

@Injectable()
export class StoreService {

    private USERKEY = "user";
    private CLIENTEKEY = "client";

    private wsToken: WsToken;
    private cliente: Cliente;

    constructor(private storage: Storage) {
        this.wsToken = null;
    }

    public clearUserData(): void {
        this.storage.clear();
        this.wsToken = null;
        this.cliente = null;
    }

    public setUserData(ws_token: WsToken): number {
        console.log("setUserData");
        this.wsToken = ws_token;
        if (ws_token != null) {
            this.storage.set(this.USERKEY, ws_token).then((val) => {
                console.log(val);
            });
        } else {
            return -1;
        }
        return 1;
    }

    public setClientData(cliente: Cliente): number {
        console.log("setUserData");
        this.cliente = cliente;
        if (cliente != null) {
            this.storage.set(this.CLIENTEKEY, cliente).then((val) => {
                console.log(val);
            });
        } else {
            return -1;
        }
        return 1;
    }

    public getUserDataPromise() {
        return new Promise(resolve => {
            if (this.wsToken == null) {
                // store service prima inizializzaione
                this.storage.get(this.USERKEY).then((val: WsToken) => {
                    // recuperato token dal database
                    console.log(val);
                    if (val != null) {
                        resolve(val);
                    } else {
                        console.log("necessario login");
                        this.setUserData(null);
                        this.wsToken = null;
                        // devo andare alla pagina del login
                        resolve(null);
                    }
                }
                );
            } else {
                // store service già inizializzato

                // come al punto precedente servirebbe controllare il token ed eventualmente fare di nuovo il login;

                resolve(this.wsToken);
            }
        });
    }

    public getClientePromise() {
        return new Promise(resolve => {
            if (this.cliente == null) {
                // store service prima inizializzaione
                this.storage.get(this.CLIENTEKEY).then((val: Cliente) => {
                    // recuperato token dal database
                    console.log(val);
                    if (val != null) {
                        resolve(val);
                    } else {
                        console.log("necessario login");
                        this.setClientData(null);
                        this.cliente = null;
                        // devo andare alla pagina del login
                        resolve(null);
                    }
                }
                );
            } else {
                // store service già inizializzato

                // come al punto precedente servirebbe controllare il token ed eventualmente fare di nuovo il login;

                resolve(this.cliente);
            }
        });
    }
}
