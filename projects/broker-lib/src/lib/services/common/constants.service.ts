import { Injectable } from '@angular/core';

@Injectable()
export class ConstantsService {
    public readonly baseAppUrl: string = 'http://89.31.75.45:443/Spring-JPA-Security';
    public readonly tokenHeaderKey: string = 'Authorization';
    public readonly pathSeparator: string = '/';

    public readonly loginServiceName: string = 'login';
    public readonly cambioPasswordServiceName: string = 'putpassword';

    // immobili
    public readonly getImmobiliServiceName: string = 'getImmobili';
    public readonly getImmobileServiceName: string = 'getimmobile';
    public readonly putImmobileServiceName: string = 'putimmobile';
    public readonly delImmobileServiceName: string = 'delimmobile';
    public readonly getCatastoServiceName: string = 'getcatasto';

    // clienti
    public readonly getClientiServiceName: string = 'getClienti';
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
}
