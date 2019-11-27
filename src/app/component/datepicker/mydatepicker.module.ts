import { NgModule } from '@angular/core';
import { IgxDatePickerModule, IgxIconModule, IgxSuffixModule, IgxInputGroupModule, IgxSnackbarModule } from 'igniteui-angular';
import { MyDatePicker } from 'src/app/component/datepicker/mydatepicker.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [MyDatePicker],
    imports: [CommonModule, FormsModule, IgxDatePickerModule, IgxIconModule, IgxSuffixModule, IgxInputGroupModule, IgxSnackbarModule],
    providers: [],
    exports: [MyDatePicker]
})
export class MyDatePickerModule { }
