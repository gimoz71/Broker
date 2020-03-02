
import { SessionService, StoreService, LoginService, ReportService, IconeService } from 'broker-lib';
import { NgModule } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { SelectDropDownModule } from 'ngx-select-dropdown';

import { IonicModule } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';

import { BrokerLibModule } from 'broker-lib';

import { HomePage } from './pages/home/home.page';
import { HomePageModule } from './pages/home/home.module';
import { ProfiloUtentePageModule } from './pages/profilo-utente/profilo-utente.module';

import { FormsModule } from '@angular/forms';
import { LoginPageModule } from './pages/login/login.module';
import { WizardPageModule } from './pages/wizard/wizard.module';
import { ReportGeneralePageModule } from './pages/report-generale/report-generale.module';
import { ReportAnalisiPageModule } from './pages/report-analisi/report-analisi.module';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { HttpClientModule } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RaHttpInterceptor } from './interceptor/http.interceptor';
import { NuovoClientePageModule } from './pages/nuovo-cliente/nuovo-cliente.module';
import { SchedaImmobilePageModule } from './pages/scheda-immobile/scheda-immobile.module';
import { PipesModule } from './pipes/pipes.module';
import { AmmortamentoPageModule } from './pages/ammortamento/ammortamento.module';
import { CatastaliPageModule } from './pages/catastali/catastali.module';
import { AppRoutingModule } from './app-routing.module';

import { NgxSelectModule } from 'ngx-select-ex';
import { LogoutCommunicationService } from './services/logoutCommunication/logoutcommunication.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [
    HomePage
  ],
  imports: [
    BrowserModule,
    SelectDropDownModule,
    IonicModule.forRoot(),
    BrokerLibModule.forRoot(),
    FormsModule,
    HomePageModule,
    ProfiloUtentePageModule,
    LoginPageModule,
    WizardPageModule,
    ReportGeneralePageModule,
    ReportAnalisiPageModule,
    NuovoClientePageModule,
    SchedaImmobilePageModule,
    AmmortamentoPageModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CatastaliPageModule,
    PipesModule,
    NgxSelectModule,
    IonicModule.forRoot()
  ],
  providers: [
    // ErrorHandlerService,
    // { provide: ErrorHandler, useClass: ErrorHandlerService },
    SessionService,
    StoreService,
    LoginService,
    IconeService,
    StatusBar,
    ReportService,
    SplashScreen,
    CurrencyPipe,
    LogoutCommunicationService,
    HTTP,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RaHttpInterceptor,
      multi: true
    }
  ],
  exports: [
    PipesModule,
    NgxSelectModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
