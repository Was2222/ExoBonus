import { Component } from '@angular/core';
import { SidebarComponent } from '../../../sidebar/sidebar.component';
import { AuthService } from '../../../../../core/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-controle-remises',
  templateUrl: './controle-remises.component.html',
  styleUrls: ['./controle-remises.component.css'],
  standalone: true,
  imports: [SidebarComponent]
})
export class ControleRemisesComponent {
  currentDate: string = new Date().toLocaleDateString();
  currentUser: string | null = "";
  constructor(
        private router: Router, // Injection correcte du Router
        public authService: AuthService
      ) {
        console.log('SidebarComponent initialized');
      }
  // Champs du formulaire
  dateIntegration: string = '';
  totalRemises: number | null = null;
  montantTotal: number | null = null;
  fichierControle: File | null = null;
  resultatControle: string = '';

  // Méthodes
  onFileSelected(event: any): void {
    this.fichierControle = event.target.files[0];
  }
  ngOnInit(): void {
    // Récupérer la date du jour
    const today = new Date();
    this.currentDate = today.toLocaleDateString();

    // Récupérer l'utilisateur connecté depuis AuthService
    this.currentUser = this.authService.username();
  }

  lancerControle(): void {
    console.log("Lancer contrôle avec :", {
      dateIntegration: this.dateIntegration,
      totalRemises: this.totalRemises,
      montantTotal: this.montantTotal,
      fichierControle: this.fichierControle?.name,
    });

    this.resultatControle = "Contrôle effectué avec succès ✅";
  }

  enregistrer(): void {
    console.log("Enregistrement des données...");
    alert("Données enregistrées !");
  }

  quitter(): void {
    console.log("Quitter...");
    alert("Fermeture de l'interface.");
  }
}
