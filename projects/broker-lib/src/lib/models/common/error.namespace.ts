// tslint:disable-next-line:no-namespace
export namespace Error {

    export class ErrorMessage {
        public msg_tipo : string;
        public msg_code : number;
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
