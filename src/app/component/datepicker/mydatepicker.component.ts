import { Component, ViewChild, Input, OnInit, Output } from "@angular/core";
import { IgxDatePickerComponent, IgxSnackbarComponent } from "igniteui-angular";
import { EventEmitter } from '@angular/core';

@Component({
    selector: "ra-date-picker",
    styleUrls: ["./mydatepicker.component.scss"],
    templateUrl: "./mydatepicker.component.html"
})
export class MyDatePicker implements OnInit {

    @Input() inputDate: Date;
    @Output() sendDate: EventEmitter<Date> = new EventEmitter<Date>();

    public date1 = new Date();

    public formatter = (date: Date) => {
        return `${this.getFormattedDay(date)}/${this.getFormattedMonth(date)}/${date.getFullYear()}`;
    }

    constructor() { }

    public ngOnInit() {
        // setting to yesterday
        this.date1.setDate(this.date1.getDate());
    }

    private getFormattedMonth(date: Date): string {
        const month = date.getMonth() + 1;
        return (month < 10 ? '0' + month : month + '');
    }

    private getFormattedDay(date: Date): string {
        const day = date.getDate();
        return (day < 10 ? '0' + day : day + '');
    }

    public close(event) {
        // this.date1 = new Date();
        this.sendDate.emit(this.date1);
    }
}
