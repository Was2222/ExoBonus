import { Component, OnInit } from "@angular/core";
import { Router, RouterModule } from "@angular/router";  // Importer le Router
import { AuthService } from "../../../../../core/services/auth.service";
import { CommonModule } from "@angular/common"
import { SidebarComponent } from "../../../sidebar/sidebar.component";


@Component({
  selector: "app-interface-bmce",
  standalone: true,
  templateUrl: "./interface-bmce.component.html",
  styleUrls: ["./interface-bmce.component.css"],
    imports: [CommonModule, RouterModule, SidebarComponent],
  
})
export class InterfaceBmceComponent implements OnInit {
  currentDate: string = "";
  user: string | null = "";

  // Variables liées aux opérations et autres champs
  selectedOperation: string = "";
  operations = [
    { id: 1, name: "Réception fichier BMCE" },
    { id: 2, name: "Envoi fichier BMCE" },
    { id: 3, name: "Contrôle intégration BMCE" },
  ];
  status: string = "En attente";

  constructor(
    private router: Router, // Injection correcte du Router
    public authService: AuthService
  ) {
    console.log('SidebarComponent initialized');
  }
  ngOnInit(): void {
    // Récupérer la date du jour
    const today = new Date();
    this.currentDate = today.toLocaleDateString();

    // Récupérer l'utilisateur connecté depuis AuthService
    this.user = this.authService.username();
  }


  // Méthode d'exécution d'opération
  executeOperation(): void {
    console.log("Exécution de l'opération:", this.selectedOperation);
    this.status = "En cours...";

    // Simuler une opération asynchrone
    setTimeout(() => {
      this.status = "Terminé";
    }, 2000);
  }

  // Actualisation des données
  refreshData(): void {
    console.log("Actualisation des données");
    this.status = "Actualisation...";

    // Simuler une opération asynchrone
    setTimeout(() => {
      this.status = "En attente";
    }, 1500);
  }

  // Génération d'un rapport
  generateReport(): void {
    console.log("Génération du rapport");
  }
  
  quit(): void {
    this.router.navigate(['/dashboard']);  }
  }

