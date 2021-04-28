import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class AppConstantsService {
    //public readonly baseAppUrl: string = environment.pathApp; //'http://test.readvice.it:443/Spring-JPA-Security';
    public readonly tokenHeaderKey: string = 'Authorization';
    public readonly pathSeparator: string = '/';
}
