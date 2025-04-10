import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../../core/services/auth.service';
import { SidebarComponent } from '../../../sidebar/sidebar.component';

@Component({
  selector: 'app-incident-paiement',
  templateUrl: './incident-paiement.component.html',
  styleUrls: ['./incident-paiement.component.css'],
  standalone: true,
  imports: [SidebarComponent]
})
export class IncidentPaiementComponent {
  currentDate: string = new Date().toLocaleDateString();
  currentUser: string | null = "";
    constructor(
          private router: Router, // Injection correcte du Router
          public authService: AuthService
        ) {
          console.log('SidebarComponent initialized');
        }
  // Champs
  dateIncident: string = '';
  referenceOperation: string = '';
  montantIncident: number | null = null;
  motifIncident: string = '';
  resultatIncident: string = '';
  ngOnInit(): void {
    // Récupérer la date du jour
    const today = new Date();
    this.currentDate = today.toLocaleDateString();

    // Récupérer l'utilisateur connecté depuis AuthService
    this.currentUser = this.authService.username();
  }

  analyserIncident(): void {
    this.resultatIncident = "Aucune anomalie détectée ✅";
    console.log("Analyse lancée :", this.dateIncident, this.referenceOperation);
  }

  enregistrer(): void {
    alert("Incident enregistré !");
  }

  quitter(): void {
    alert("Fermeture de l’écran.");
  }
}
