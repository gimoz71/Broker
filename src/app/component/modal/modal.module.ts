import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalQuoteProprietaComponent } from './quoteproprieta/modalquoteproprieta.component';

@NgModule({
    imports: [CommonModule],
    declarations: [ModalQuoteProprietaComponent],
    exports: [ModalQuoteProprietaComponent]
})
export class ModalModule { }
