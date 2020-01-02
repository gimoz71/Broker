import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule) },
    { path: 'profilo-utente', loadChildren: () => import('./pages/profilo-utente/profilo-utente.module').then(m => m.ProfiloUtentePageModule) },
    { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule) },
    { path: 'wizard', loadChildren: () => import('./pages/wizard/wizard.module').then(m => m.WizardPageModule) },
    { path: 'scheda-immobile', loadChildren: () => import('./pages/scheda-immobile/scheda-immobile.module').then(m => m.SchedaImmobilePageModule) },
    { path: 'nuovo-cliente', loadChildren: () => import('./pages/nuovo-cliente/nuovo-cliente.module').then(m => m.NuovoClientePageModule) },
    // { path: 'scheda-cliente', loadChildren: './pages/scheda-cliente/scheda-cliente.module#SchedaClientePageModule' },
    { path: 'patrimonio', loadChildren: () => import('./pages/patrimonio/patrimonio.module').then(m => m.PatrimonioPageModule) },
    { path: 'catastali', loadChildren: () => import('./pages/catastali/catastali.module').then(m => m.CatastaliPageModule) },
    { path: 'report-generale', loadChildren: () => import('./pages/report-generale/report-generale.module').then(m => m.ReportGeneralePageModule) },
    { path: 'report-analisi', loadChildren: () => import('./pages/report-analisi/report-analisi.module').then(m => m.ReportAnalisiPageModule) },
    { path: 'ammortamento', loadChildren: () => import('./pages/ammortamento/ammortamento.module').then(m => m.AmmortamentoPageModule) },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
