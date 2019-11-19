import { ErrorMessage } from './errormessage';

// tslint:disable-next-line:no-namespace
export namespace Http {
    export class HttpResponse {
        public Success: boolean;        // Esito della chiamata
        public ErrorMessage: ErrorMessage;       // oggetto errore 
        public Data: any;
    }
}
