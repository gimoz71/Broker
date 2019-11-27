import { Component, ViewChild, Input, OnInit } from "@angular/core";
import { IgxDatePickerComponent, IgxSnackbarComponent } from "igniteui-angular";

@Component({
    selector: "ra-date-picker",
    styleUrls: ["./mydatepicker.component.scss"],
    templateUrl: "./mydatepicker.component.html"
})
export class MyDatePicker implements OnInit {

    @Input() inputDate: Date;
    public date1 = new Date();

    constructor() { }

    public ngOnInit() {
        // setting to yesterday
        this.date1.setDate(this.date1.getDate() - 1);
    }
}
