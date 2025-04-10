import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../../sidebar/sidebar.component';
import { Router } from '@angular/router';
import { AuthService } from '../../../../../core/services/auth.service';

@Component({
  selector: 'app-statut-solde',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  templateUrl: './statut-solde.component.html',
  styleUrls: ['./statut-solde.component.css']
})
export class StatutSoldeComponent {
  currentDate: string = new Date().toLocaleDateString();
user: string | null = "";

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

  // Méthode pour quitter et rediriger vers le Dashboard
 

quit(): void {
  this.router.navigate(['/dashboard']);  }
}
