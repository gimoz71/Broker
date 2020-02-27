import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'raDateFormat_gg_mm_aaaa' })
export class RaDatePipe implements PipeTransform {
    transform(value: number, times: number) {
        // in input ho sempre una stringa contenente il long della data
        if (value !== 0) {
            const date = new Date(+value);
            return this.leftpad(date.getDate(), 2)
                + '/' + this.leftpad(date.getMonth() + 1, 2)
                + '/' + date.getFullYear();
        } else {
            return '';
        }
    }

    private leftpad(val, resultLength = 2, leftpadChar = '0'): string {
        return (String(leftpadChar).repeat(resultLength)
            + String(val)).slice(String(val).length);
    }
}
