
import { SessionService, StoreService, LoginService } from 'broker-lib';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';

import { BrokerLibModule } from 'broker-lib';

import { HomePage } from './pages/home/home.page';
import { HomePageModule } from './pages/home/home.module';

import { FormsModule } from '@angular/forms';
import { LoginPageModule } from './pages/login/login.module';
import { WizardPageModule } from './pages/wizard/wizard.module';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { HttpClientModule } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RaHttpInterceptor } from './interceptor/http.interceptor';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule) },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule) },
  { path: 'wizard', loadChildren: () => import('./pages/wizard/wizard.module').then(m => m.WizardPageModule) },
  { path: 'scheda-immobile', loadChildren: () => import('./pages/scheda-immobile/scheda-immobile.module').then(m => m.SchedaImmobilePageModule) },
  // { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule) },
  // { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule) },
  // { path: 'dashboard', loadChildren: './pages/dashboard/dashboard.module#DashboardPageModule' },
  // { path: 'scheda-immobile', loadChildren: './pages/scheda-immobile/scheda-immobile.module#SchedaImmobilePageModule' },
  // { path: 'report', loadChildren: './pages/report/report.module#ReportPageModule' },
  // { path: 'analisi', loadChildren: './pages/analisi/analisi.module#AnalisiPageModule' },
  // { path: 'nuovo-cliente', loadChildren: './pages/nuovo-cliente/nuovo-cliente.module#NuovoClientePageModule' },
  // { path: 'scheda-cliente', loadChildren: './pages/scheda-cliente/scheda-cliente.module#SchedaClientePageModule' },
  // { path: 'patrimonio', loadChildren: './pages/patrimonio/patrimonio.module#PatrimonioPageModule' },
  // { path: 'catastali', loadChildren: './pages/catastali/catastali.module#CatastaliPageModule' },
  // { path: 'report-generale', loadChildren: './pages/report-generale/report-generale.module#ReportGeneralePageModule' },
  { path: 'report-analisi', loadChildren: () => import('./pages/report-analisi/report-analisi.module').then(m => m.ReportAnalisiPageModule) }
  // { path: 'ammortamento', loadChildren: './pages/ammortamento/ammortamento.module#AmmortamentoPageModule' },
  // { path: 'client-home', loadChildren: './pages/client-home/client-home.module#ClientHomePageModule' },

];

@NgModule({
  declarations: [AppComponent],
  entryComponents: [
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    BrokerLibModule.forRoot(),
    FormsModule,
    HomePageModule,
    LoginPageModule,
    WizardPageModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    // ErrorHandlerService,
    // { provide: ErrorHandler, useClass: ErrorHandlerService },
    SessionService,
    StoreService,
    LoginService,
    StatusBar,
    SplashScreen,
    HTTP,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RaHttpInterceptor,
      multi: true
    }
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
