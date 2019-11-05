import { Injectable } from '@angular/core';

@Injectable()
export class ConstantsService {
    public readonly baseAppUrl: string = 'http://localhost:3000';
    public readonly tokenHeaderKey: string = 'token';
    public readonly pathSeparator: string = '/';

    public readonly loginServiceName: string = 'login';
    public readonly cambioPasswordServiceName: string = 'putpassword';

    public readonly getImmobiliServiceName: string = 'getimmobili';
    
    public readonly getClientiServiceName: string = 'getclienti';
    public readonly putClientiServiceName: string = 'putcliente';
    public readonly abilitaAppClienteServiceName: string = 'appcliente';
    public readonly bookValueServiceName: string = 'getbookvalue';

    public readonly postErroreServiceName: string = 'put_error';
    public readonly getDropdownServiceName: string = 'get_dropdown';
}
