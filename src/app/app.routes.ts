import { Routes } from '@angular/router';
import { InterfaceTgrComponent } from './features/dashboard/pages/interfaces-partenaires/interface-tgr/interface-tgr.component';
import { InterfaceBmceComponent } from './features/dashboard/pages/interfaces-partenaires/interface-bmce/interface-bmce.component';
import { SidebarComponent } from './features/dashboard/sidebar/sidebar.component';  // Assure-toi d'importer SidebarComponent
import { authGuard } from './core/guards/auth.guard';
import { Interface4002Component } from './features/dashboard/pages/interfaces-partenaires/interface-4002/interface-4002.component';
import { StatutSoldeComponent } from './features/dashboard/pages/traitement-compensation/statut-solde/statut-solde.component';
import { SimtRetourComponent } from './features/dashboard/pages/traitement-compensation/simt-retour/simt-retour.component';
import { SimtAllerComponent } from './features/dashboard/pages/traitement-compensation/simt-aller/simt-aller.component';
import { ControleRemisesComponent } from './features/dashboard/pages/traitement-compensation/controle-remise/controle-remises.component';
import { IncidentPaiementComponent } from './features/dashboard/pages/traitement-compensation/incident-paiement/incident-paiement.component';
import { Integration40024153Component } from './features/dashboard/pages/integration4002/integration4002.component';
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent),
  },
  {path: 'dashboard',
    component: SidebarComponent,},
  {
    path: 'dashboard',
        canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'tableau-de-bord',
        pathMatch: 'full',
      },
      {
        path: 'tableau-de-bord',
        loadComponent: () => import('./features/dashboard/pages/tableau-de-bord/tableau-de-bord.component').then(m => m.TableauDeBordComponent),
      },
      {
        path: 'interface-tgr' ,
                component: InterfaceTgrComponent, 
      },
      {
        path: 'interface-bmce',
        component: InterfaceBmceComponent,
      },
      {
        path: 'interface-4002',
        component: Interface4002Component,
      },
      {
        path: 'statut-solde',
        component: StatutSoldeComponent,
      },
      {
        path: 'SIMT-Retour',
        component: SimtRetourComponent,
      },
      {
        path: 'SIMT-Aller',
        component: SimtAllerComponent,
      },
      {
        path: 'Controle-Remises',
        component: ControleRemisesComponent,
      },
      {
        path: 'incident-paiement',
        component: IncidentPaiementComponent,
      },
      {
        path: 'discordance-olympic',
        component: IncidentPaiementComponent,
      },
      {
        path: 'integration-4002',
        component: Integration40024153Component,
      },
      
    ],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
