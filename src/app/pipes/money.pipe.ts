import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'k_money' })
export class RaMoneyPipe implements PipeTransform {
    transform(value: string, times: number) {
        // in input ho sempre una stringa contenente il numero da convertire
        return ((parseFloat(value) / 1000) + 'K').replace('.', ',');
    }
}
