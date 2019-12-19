import { Injectable } from '@angular/core';

@Injectable()
export class ConstantsService {
    public readonly baseAppUrl: string = 'http://89.31.75.45:443/Spring-JPA-Security';
    public readonly tokenHeaderKey: string = 'Authorization';
    public readonly pathSeparator: string = '/';

    public readonly loginServiceName: string = 'login';
    public readonly cambioPasswordServiceName: string = 'putPassword';

    // immobili
    public readonly getImmobiliServiceName: string = 'getImmobili';
    public readonly getImmobileServiceName: string = 'getImmobile';
    public readonly putImmobileServiceName: string = 'putImmobile';
    public readonly delImmobileServiceName: string = 'delimmobile';
    public readonly getCatastoServiceName: string = 'getcatasto';

    // clienti
    public readonly getClientiServiceName: string = 'getClienti';
    public readonly putClientiServiceName: string = 'putCliente';
    public readonly abilitaAppClienteServiceName: string = 'appcliente';
    public readonly bookValueServiceName: string = 'getBookValue';
    public readonly pianoAmmortamentoServiceName: string = 'getpiano';

    // report
    public readonly situazioneGeneraleServiceName: string = 'getSituazione';
    public readonly graficiServiceName: string = 'getgrafici';
    public readonly pdfReportServiceName: string = 'getpdfreport';

    public readonly postErroreServiceName: string = 'writeLog';
    public readonly getDropdownServiceName: string = 'get_dropdown';

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
}
