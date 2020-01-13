import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'k_money' })
export class RaMoneyPipe implements PipeTransform {
    transform(value: any, times: number) {
        if (isNaN(value)) {
            if (value === 'true') {
                return 'SI';
            } else if (value === 'true') {
                return 'NO';
            } else {
                return value;
            }
        }
        if (value === undefined || value === null) {
            return "0K";
        } else {
            return ((parseFloat(value) / 1000) + 'K').replace('.', ',');
        }
    }
}
