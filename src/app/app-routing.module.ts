import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardPageModule' },
  { path: 'scheda-immobile', loadChildren: './scheda-immobile/scheda-immobile.module#SchedaImmobilePageModule' },
  { path: 'report', loadChildren: './report/report.module#ReportPageModule' },
  { path: 'analisi', loadChildren: './analisi/analisi.module#AnalisiPageModule' },
  { path: 'nuovo-cliente', loadChildren: './nuovo-cliente/nuovo-cliente.module#NuovoClientePageModule' },
  { path: 'scheda-cliente', loadChildren: './scheda-cliente/scheda-cliente.module#SchedaClientePageModule' },
  { path: 'wizard', loadChildren: './wizard/wizard.module#WizardPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
