import { Injectable } from '@angular/core';

@Injectable()
export class ConstantsService {
    readonly baseAppUrl: string = 'http://localhost:3000';
    readonly tokenHeaderKey: string = 'token';
    readonly pathSeparator: string = '/';

    readonly getImmobiliServiceName: string = 'getimmobili';
    readonly getClientiServiceName: string = 'getclienti';
    readonly postErroreServiceName: string = 'put_error';
    readonly getDropdownServiceName: string = 'get_dropdown';
}
