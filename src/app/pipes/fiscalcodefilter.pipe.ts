import { Pipe, PipeTransform } from '@angular/core';
import { Cliente } from 'broker-lib';
@Pipe({
    name: 'fiscalcodefilter'
})
export class FiscalCodeFilterPipe implements PipeTransform {

    transform(items: Cliente[], searchText: string): any[] {
        if (!items) {
            return [];
        }

        if (!searchText) {
            return items;
        }

        searchText = searchText.toLowerCase();
        return items.filter(it => {
            return it.codice_fiscale.toLowerCase().includes(searchText);
        });
    }
}