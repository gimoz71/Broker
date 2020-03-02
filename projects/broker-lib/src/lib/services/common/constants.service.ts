import { Injectable } from '@angular/core';

@Injectable()
export class ConstantsService {
    public readonly baseAppUrl: string = 'http://89.31.75.45:443/Spring-JPA-Security';
    // public readonly baseAppUrl: string = 'http://test.readvice.it:443/Spring-JPA-Security';
    public readonly tokenHeaderKey: string = 'Authorization';
    public readonly pathSeparator: string = '/';

    public readonly loginServiceName: string = 'login';
    public readonly cambioPasswordServiceName: string = 'putPassword';

    // immobili
    public readonly getImmobiliServiceName: string = 'getimmobili';
    public readonly getImmobileServiceName: string = 'getimmobile';
    public readonly putImmobileServiceName: string = 'putimmobile';
    public readonly delImmobileServiceName: string = 'delimmobile';
    public readonly getCatastoServiceName: string = 'getcatasto';
    public readonly getPianoAmmortamentoServiceName: string = 'getpiano';

    // clienti
    public readonly getClientiServiceName: string = 'getclienti';
    public readonly getClienteServiceName: string = 'getcliente';
    public readonly putClientiServiceName: string = 'putcliente';
    public readonly abilitaAppClienteServiceName: string = 'appcliente';
    public readonly bookValueServiceName: string = 'getbookvalue';
    public readonly pianoAmmortamentoServiceName: string = 'getpiano';

    // report
    public readonly situazioneGeneraleServiceName: string = 'getsituazione';
    public readonly graficiServiceName: string = 'getgrafici';
    public readonly pdfReportServiceName: string = 'getpdfreport';

    public readonly postErroreServiceName: string = 'writeLog';
    public readonly getDropdownServiceName: string = 'get_dropdown';

    // documenti
    public readonly getCartelle: string = 'getcartelle';
    public readonly getDocumento: string = 'getdocumento';
    public readonly putCartelle: string = 'putcartelle';
    public readonly putDocumento: string = 'putdocumento';

    // tipologia icone immobili
    public readonly tipologiaImmobileVilla: string = 'villa';
    public readonly tipologiaImmobileCasa: string = 'casa';
    public readonly tipologiaImmobileAgricolo: string = 'agricolo';
    public readonly tipologiaImmobileUfficio: string = 'ufficio';
    public readonly tipologiaImmobileAlbergo: string = 'albergo';
    public readonly tipologiaImmobileOspedale: string = 'ospedale';
    public readonly tipologiaImmobileScuola: string = 'scuola';
    public readonly tipologiaImmobileMuseo: string = 'museo';
    public readonly tipologiaImmobileChiesa: string = 'chiesa';
    public readonly tipologiaImmobileMagazzino: string = 'magazzino';
    public readonly tipologiaImmobileNegozio: string = 'negozio';
    public readonly tipologiaImmobileSport: string = 'sport';
    public readonly tipologiaImmobileGarage: string = 'garage';
    public readonly tipologiaImmobileFabbrica: string = 'fabbrica';
    public readonly tipologiaImmobileTeatro: string = 'teatro';
    public readonly tipologiaImmobileBanca: string = 'banca';
    public readonly tipologiaImmobilePonte: string = 'ponte';
    public readonly tipologiaImmobileStazione: string = 'stazione';
    public readonly tipologiaImmobileCantiere: string = 'cantiere';
    public readonly tipologiaImmobileTerreno: string = 'terreno';

    // dropdown
    public readonly getDdlEuribor: string = 'get_ddl_tipo_euribor';
    public readonly getDdlAffittuari: string = 'get_ddl_tipo_affittuari';
    public readonly getDdlTasse: string = 'get_ddl_tasse';
    public readonly getDdlOmi: string = 'get_ddl_omi';
    public readonly getDdlTipologiaCatastale: string = 'get_ddl_tipologia_catastale';
    public readonly getDdlComuni: string = 'get_ddl_comuni';

    // vari
    public readonly httpTimeout: number = 5000; // per il momento il timeout è impostato a 5 secondi per le chiamate get e post

}
