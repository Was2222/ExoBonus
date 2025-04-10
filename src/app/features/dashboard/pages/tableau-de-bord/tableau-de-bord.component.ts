import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"

@Component({
  selector: "app-tableau-de-bord",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container">
      <h1>Tableau de Bord</h1>
      <div class="content-card">
        <p>Bienvenue sur le tableau de bord de l'application.</p>
        <p>Ici vous pouvez consulter les statistiques et les rapports.</p>
      </div>
    </div>
  `,
  styles: [
    `
    .page-container {
      padding: 1rem;
    }
    
    h1 {
      color: #2c3e50;
      margin-bottom: 1.5rem;
    }
    
    .content-card {
      background-color: white;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
  `,
  ],
})
export class TableauDeBordComponent {}

