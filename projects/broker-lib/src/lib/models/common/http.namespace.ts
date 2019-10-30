import { Error } from './error.namespace';

// tslint:disable-next-line:no-namespace
export namespace Http {
    export class HttpResponse {
        public Success: boolean;        // Esito della chiamata
        public ErrorMessage: Error.ErrorMessage;       // oggetto errore 
        public Data: any;
    }
}
