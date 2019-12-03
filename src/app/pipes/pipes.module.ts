import { NgModule } from '@angular/core';
import { ClientFilterPipe } from './namefilter.pipe';
import { RaDatePipe } from './date.pipe';

@NgModule({
    imports: [],
    declarations: [ClientFilterPipe, RaDatePipe],
    exports: [ClientFilterPipe, RaDatePipe],
})

export class PipesModule {

    static forRoot() {
        return {
            ngModule: PipesModule,
            providers: [],
        };
    }
}
