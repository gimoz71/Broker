import { Injectable } from '@angular/core';

@Injectable()
export class AppConstantsService {
    public readonly baseAppUrl: string = 'http://89.31.75.45:443/Spring-JPA-Security';
    public readonly tokenHeaderKey: string = 'Authorization';
    public readonly pathSeparator: string = '/';
}
