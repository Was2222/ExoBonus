import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../../sidebar/sidebar.component';
import { Router } from '@angular/router';
import { AuthService } from '../../../../../core/services/auth.service';

@Component({
  selector: 'app-simt-retour',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  templateUrl: './simt-retour.component.html',
  styleUrls: ['./simt-retour.component.css']
})
export class SimtRetourComponent {
    currentDate: string = new Date().toLocaleDateString();
    currentUser: string | null = "";
    
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
        this.currentUser = this.authService.username();
      }
    
      // Méthode pour quitter et rediriger vers le Dashboard
     
    
    quit(): void {
      this.router.navigate(['/dashboard']);  }
    }
