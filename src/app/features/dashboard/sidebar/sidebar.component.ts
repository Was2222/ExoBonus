import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { Router, RouterModule } from "@angular/router"
import { AuthService } from "../../../core/services/auth.service"
interface MenuItem {
  label: string
  route?: string
    children?: MenuItem[]
  expanded?: boolean
}

@Component({
  selector: "app-sidebar",
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="top-menu">
      <div *ngFor="let item of menuItems" class="menu-item"
           (mouseenter)="toggleSubmenu(item, true)"
           (mouseleave)="toggleSubmenu(item, false)">
           
        <span>{{ item.label }}</span>

        <!-- Sous-menu (vertical) -->
        <div *ngIf="item.children && item.expanded" class="submenu">
          <div *ngFor="let child of item.children" class="submenu-item"
               (mouseenter)="toggleSubmenu(child, true)"
               (mouseleave)="toggleSubmenu(child, false)"
               (click)="navigateIfRoute(child, $event)">
            {{ child.label }}

            <!-- Sous-sous-menu (horizontal) -->
            <div *ngIf="child.children && child.expanded" class="sub-submenu">
              <div *ngFor="let grandchild of child.children" class="sub-submenu-item"
                   (mouseenter)="toggleSubmenu(grandchild, true)"
                   (mouseleave)="toggleSubmenu(grandchild, false)"
                   (click)="navigateIfRoute(grandchild, $event)">
                {{ grandchild.label }}

                <!-- Sous-sous-sous-menu (horizontal) -->
                <div *ngIf="grandchild.children && grandchild.expanded" class="sub-sub-submenu">
                  <div *ngFor="let greatgrandchild of grandchild.children" class="sub-sub-submenu-item"
                       (click)="navigate(greatgrandchild, $event)">
                    {{ greatgrandchild.label }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: [
    `
    .top-menu {
      display: flex;
      background-color: #34495e;
      color: white;
      padding: 10px;
      position: relative;
    }

    .menu-item {
      position: relative;
      padding: 10px 20px;
      cursor: pointer;
      white-space: nowrap;
    }

    .menu-item:hover {
      background-color: #2c3e50;
    }

    /* Sous-menus (affichage vertical) */
    .submenu {
      position: absolute;
      top: 100%;
      left: 0;
      background-color: #2c3e50;
      padding: 5px;
      display: none;
      min-width: 200px;
      box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
      z-index: 1000;
    }

    /* Sous-sous-menus et sous-sous-sous-menus (affichage horizontal) */
    .sub-submenu, .sub-sub-submenu {
      position: absolute;
      top: 0;
      left: 100%;
      background-color: #2c3e50;
      padding: 5px;
      display: none;
      min-width: 200px;
      box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
      z-index: 1000;
    }

    /* Afficher les sous-menus au survol */
    .menu-item:hover > .submenu {
      display: block;
    }

    /* Afficher les sous-sous-menus horizontalement */
    .submenu-item:hover > .sub-submenu {
      display: block;
    }

    .sub-submenu-item:hover > .sub-sub-submenu {
      display: block;
    }

    /* Styliser les items */
    .submenu-item, .sub-submenu-item, .sub-sub-submenu-item {
      padding: 8px 12px;
      cursor: pointer;
      color: white;
      position: relative;
    }

    .submenu-item:hover, .sub-submenu-item:hover, .sub-sub-submenu-item:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
    `,
  ],
})
export class SidebarComponent {
  menuItems: MenuItem[] = [
    {
      label: "Production",
      children: [
        {
          label: "Bancaire",
          expanded: false,
          children: [
            {
              label: "Tableau de Bord",
              expanded: false,
              route: "/dashboard/tableau-de-bord",
            },
            {
              label: "Interfaces Partenaires",
              expanded: false,
              route: "/dashboard/interfaces-partenaires",
              children: [
                { label: "Interface TGR", route: "/dashboard/interface-tgr"},
                { label: "Interface BMCE", route: "/dashboard/interface-bmce" },
                { label: "Interface 4002/4153", route: "/dashboard/interface-4002" },
              ],
            },
            {
              label: "Traitement Compensation",
              route: "/dashboard/traitement-compensation",
              expanded: false,
              children: [
                { label: "Statut solde SIMT", route: "/dashboard/statut-solde" },
                { label: "Chek UAP", route: "/dashboard/check-uap" },
                { label: "SIMT Retour", route: "/dashboard/SIMT-Retour" },
                { label: "SIMT ALLER", route: "/dashboard/SIMT-Aller" },
                { label: "Controle des remises ", route: "/dashboard/Controle-Remises" },
                { label: "Discordance Olympic ", route: "/dashboard/discordance-olympic" },
                { label: "Incident paiement ", route: "/dashboard/incident-paiement" },
              ],
            },
            {
              label: "Extraction",
              route: "/dashboard/Extraction",
              expanded: false,
              children: [
                { label: "Commande Chequier", route: "/dashboard/interface-cft/extraction" },
                { label: "Relevé Compte", route: "/dashboard/interface-cft/check-uap" },
                { label: "Relevé Affaires", route: "/dashboard/interface-cft/SIMT-Retour" },
              ],
            },
            {
              label: "Traitement Editique",
              route: "/dashboard/Extraction",
              expanded: false,
              children: [
                { label: "Editique PDF", route: "/dashboard/interface-cft/extraction" },
                { label: "Editique TXT ", route: "/dashboard/interface-cft/check-uap" },
                { label: "Editique Papier", route: "/dashboard/interface-cft/SIMT-Retour" },
                { label: "Mensuel avis espece", route: "/dashboard/interface-cft/SIMT-Retour" },
              ],
            },
            {
              label: "Traitement Olympic",
              route: "/dashboard/Extraction",
              expanded: false,
              children: [
                { label: "Retardement Olympic", route: "/dashboardextraction" },
                { label: "Blocage Applicative Websphere ", route: "/dashboard/interface-cft/check-uap" },
                { label: "Lancement de la constation", route: "/dashboard/interface-cft/SIMT-Retour" },
                { label: "Lancement Script replication avant EQD", route: "/dashboard/interface-cft/SIMT-Retour" },
                { label: "Lancement Script replication aprés EQD", route: "/dashboard/interface-cft/SIMT-Retour" },
              ],
            },
            {
              label: "Ouverture journée Bancaire",
              expanded: false,
              route: "/dashboard/interfaces-partenaires",
            },
            {
              label: "Clorture de la journée",
              expanded: false,
              route: "/dashboard/interfaces-partenaires",
            },
            {
              label: "Depot cheque SIMT vers RDDR",
              expanded: false,
              route: "/dashboard/interfaces-partenaires",
            },
          ],
        },
        {
          label: "Banque Digitale",
          expanded: false,
          children: [
            {
              label: "DIGIPROL",
              route: "/dashboard/interface-cft/extraction",
              expanded: false,
              children: [
                { label: "Check DIGIPROL", route: "/dashboard/interface-cft/extraction" },
                { label: "SIMT : Deplacement chargement Chèque ", route: "/dashboard/interface-cft/check-uap" },
                { label: "TGR : Deplacement chargement Chèque", route: "/dashboard/interface-cft/SIMT-Retour" },
              ],
            },
            {
              label: "CDGNET",
              route: "/dashboard/interface-cft/traitement-elliptique",
              expanded: false,
              children: [
                { label: "Chargement Avis Notaires", route: "/dashboard/interface-cft/extraction" },
                { label: "Chargement CDGNET ", route: "/dashboard/interface-cft/check-uap" },
                { label: "Generation De Rapport Injection CDGNET", route: "/dashboard/interface-cft/SIMT-Retour" },
                { label: "Relevés Affaire", route: "/dashboard/interface-cft/SIMT-Retour" },
                { label: "Relevés Compte", route: "/dashboard/interface-cft/SIMT-Retour" },
              ],
            },
            { label: "Controle Notaire", route: "/dashboard/interface-cft/traitement-olympic" },
            { label: "Envoi ABB CFT", route: "/dashboard/interface-cft/traitement-olympic" },
          ],
        },
        {
          label: "Interface CFT",
          expanded: false,
          children: [
            {
              label: "Réception des fichiers BMCE Via CFT + envoi au client pour valider l'intégration",
              route: "/dashboard/interface-cft/reception-bmce",
            },
            { label: "Réception relevé 4008 4040 4153 4002", route: "/dashboard/interface-cft/reception-releve" },
            {
              label: "Réception du fichier RAR images chèques réseaux rabat",
              route: "/dashboard/interface-cft/reception-rar-cheques",
            },
            { label: "Réception des fichiers TGR Via CFT", route: "/dashboard/interface-cft/reception-tgr" },
            { label: "Réception des fichiers DGI", route: "/dashboard/interface-cft/reception-dgi" },
            { label: "Envoi des fichiers FOBDAR vers TRAGFM", route: "/dashboard/interface-cft/envoi-fobdar" },
            { label: "Réception des incidents de paiement", route: "/dashboard/interface-cft/reception-incidents" },
            { label: "Envoi des avis notoire ABB", route: "/dashboard/interface-cft/envoi-avis-notoire" },
          ],
        },
        { label: "EXPORT DB", route: "/dashboard/banque-marches/Export-DB" },
        { label: "Consignation", route: "/dashboard/banque-marches/Export-DB" },
        {
          label: "Banque de Marchés",
          route: "/dashboard/banque-marches",
          expanded: false,
          children: [
            { label: "Chargement interface GL CDG + Envoi des LOGs", route: "/dashboard/chargement-interface-gl-cog" },
            { label: "Controle KP KTP", route: "/dashboard/controle-kp-ktp" },
            { label: "CMBR", route: "/dashboard/cmbr" },
          ],
        },
        {
          label: "Comptabilité",
          route: "/dashboard/comptabilite",
          expanded: false,
          children: [
            { label: "Chargement interface GL CDG + Envoi des LOGs", route: "/dashboard/chargement-interface-gl-cog" },
            { label: "GL_ICBS", route: "/dashboard/gl_icbs" },
          ],
        },
        {
          label: "Foncier",
          route: "/dashboard/foncier",
          expanded: false,
          children: [{ label: "SIPTF", route: "/dashboard/siptf" }],
        },
        {
          label: "Ressources Humaines",
          route: "/dashboard/ressources-humaines",
          expanded: false,
          children: [{ label: "AGIRH", route: "/dashboard/agirh" }],
        },
        { label: "Achat et Logistique", route: "/dashboard/achat-logistique" },
        { label: "Sortir", route: "/dashboard/sortir" },
      ],
    },
    { label: "Check applicatifs", route: "/dashboard/chech-applicatifs" },
    { label: "Reporting", route: "/dashboard/reporting" },
    {
      label: "Activité Service Desk",
      children: [
        { label: "Moulinette DGI", route: "/dashboard/moulinette-dgi" },
        { label: "Service DGI", route: "/dashboard/service-dgi" },
        { label: "Reconciliation Aller DGI", route: "/dashboard/reconciliation-aller-dgi" },
        { label: "Contrôle Doublons DGI", route: "/dashboard/controle-doublons-dgi" },
        { label: "Moulinette IFP", route: "/dashboard/moulinette-ifp" },
        { label: "Virement de Masse", route: "/dashboard/virement-masse" },
        { label: "LOP + FRG + MMA", route: "/dashboard/lop-frg-mma" },
        { label: "Suppression Compte CDGNET", route: "/dashboard/suppression-compte-cdgnet" },
      ],
    },
    { label: "Integration Virement de masse ICBS", route: "/dashboard/int-icbs" },
    { label: "Integration 4002/4153", route: "/dashboard/integration-4002" },
    { label: "Integration PGAs", route: "/dashboard/int-pgas" },
    { label: "Rapport", route: "/dashboard/rapport" },
  ]

  constructor(
    private router: Router, // Injection correcte du Router
    public authService: AuthService
  ) {
    console.log('SidebarComponent initialized');
  }

  toggleSubmenu(item: MenuItem, state: boolean) {
    item.expanded = state;
  }

  navigateIfRoute(item: MenuItem, event: Event) {
    event.stopPropagation();
    if (item.route && (!item.children || item.children.length === 0)) {
      this.navigate(item, event);
    }
  }

  navigate(item: MenuItem, event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    if (item.route) {
      this.router.navigateByUrl(item.route);
    }
  }
  

  logout(): void {
    this.authService.logout();
  }
}