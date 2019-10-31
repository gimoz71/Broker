// tslint:disable-next-line:no-namespace
export namespace Error {

    export class ErrorResponse {
        public Success: boolean;        // Esito della chiamata
        public Data: any;               // Eventuali dati restituiti dal server: possono essere oggetti, array, ecc...
        public Message: string;         // Eventuale messaggio. In caso di Success=false, l'error message viene inserito qui
    }

    export class ErrorData {
        public ErrorType: string;
        public Data: any;
        public message: string;
    }

    export class ErrorMessage {
        public msg_tipo : string;
        public msg_code : number; // 0=success 
        public msg_testo : string;
        public msg_method: string;
        public msg_techdata: string;
    }

    export class WsLogErrore {
        public token: string;
        public log_stacktrace: string;
        public log_descrerr: string;
        public log_metodoerr: string;
        public log_link: string;
        public log_query: string;
        public username: string;
    }

}
