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
}
