import { Injectable } from '@angular/core';

@Injectable()
export class ConstantsService {
    public readonly baseAppUrl: string = 'http://localhost:3000';
    public readonly tokenHeaderKey: string = 'token';
    public readonly pathSeparator: string = '/';

    public readonly loginServiceName: string = 'login';
    public readonly cambioPasswordServiceName: string = 'putpassword';

    // immobili
    public readonly getImmobiliServiceName: string = 'getimmobili';
    public readonly getImmobileServiceName: string = 'getimmobile';
    public readonly putImmobileServiceName: string = 'putimmobile';
    public readonly delImmobileServiceName: string = 'delimmobile';
    public readonly getCatastoServiceName: string = 'getcatasto';

    // clienti
    public readonly getClientiServiceName: string = 'getclienti';
    public readonly putClientiServiceName: string = 'putcliente';
    public readonly abilitaAppClienteServiceName: string = 'appcliente';
    public readonly bookValueServiceName: string = 'getbookvalue';
    public readonly pianoAmmortamentoServiceName: string = 'getpiano';

    // report
    public readonly situazioneGeneraleServiceName: string = 'getsituazione';
    public readonly graficiServiceName: string = 'getGrafici';
    public readonly pdfReportServiceName: string = 'getpdfreport';

    public readonly postErroreServiceName: string = 'put_error';
    public readonly getDropdownServiceName: string = 'get_dropdown';
}
