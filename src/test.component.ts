import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-interface-tgr",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="interface-container">
      <div class="interface-header">
        <h2>Interface TGR</h2>
        <div class="status-indicator">
          Statut: 
          <span [ngClass]="{'status-pending': status === 'En attente', 
                             'status-processing': status === 'En cours...' || status === 'Actualisation...', 
                             'status-completed': status === 'Terminé'}">
            {{ status }}
          </span>
        </div>
      </div>
      
      <div class="interface-content">
        <div class="left-panel">
          <div class="panel-header">
            <h3>Opérations TGR</h3>
          </div>
          
          <div class="form-section">
            <div class="form-group">
              <label for="operation">Sélectionner une opération:</label>
              <select id="operation" class="form-control" [(ngModel)]="selectedOperation">
                <option value="">-- Choisir une opération --</option>
                <option *ngFor="let op of operations" [value]="op.id">{{ op.name }}</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="date">Date d'opération:</label>
              <input type="date" id="date" class="form-control" [(ngModel)]="selectedDate">
            </div>
            
            <div class="button-group">
              <button class="btn btn-primary" [disabled]="!selectedOperation" (click)="executeOperation()">
                Exécuter l'opération
              </button>
              <button class="btn btn-secondary" (click)="refreshData()">
                Actualiser
              </button>
              <button class="btn btn-info" (click)="generateReport()">
                Générer un rapport
              </button>
            </div>
          </div>
        </div>
        
        <div class="right-panel">
          <div class="panel-header">
            <h3>Historique des transactions</h3>
          </div>
          
          <div class="transaction-list">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Statut</th>
                  <th>Détails</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let transaction of transactions" [ngClass]="{'error-row': transaction.status === 'Erreur'}">
                  <td>{{ transaction.date }}</td>
                  <td>{{ transaction.type }}</td>
                  <td>{{ transaction.status }}</td>
                  <td>{{ transaction.details }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
    .interface-container {
      font-family: Arial, sans-serif;
      border: 1px solid #ddd;
      border-radius: 4px;
      background-color: #f9f9f9;
      padding: 15px;
      width: 100%;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }
    
    .interface-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #34495e;
      color: white;
      padding: 10px 15px;
      border-radius: 4px;
      margin-bottom: 15px;
    }
    
    .interface-header h2 {
      margin: 0;
      font-size: 18px;
    }
    
    .status-indicator {
      font-size: 14px;
    }
    
    .status-pending {
      color: #f39c12;
    }
    
    .status-processing {
      color: #3498db;
    }
    
    .status-completed {
      color: #2ecc71;
    }
    
    .interface-content {
      display: flex;
      gap: 15px;
    }
    
    .left-panel, .right-panel {
      flex: 1;
      background-color: white;
      border: 1px solid #ddd;
      border-radius: 4px;
      overflow: hidden;
    }
    
    .panel-header {
      background-color: #f5f5f5;
      padding: 10px 15px;
      border-bottom: 1px solid #ddd;
    }
    
    .panel-header h3 {
      margin: 0;
      font-size: 16px;
      color: #333;
    }
    
    .form-section {
      padding: 15px;
    }
    
    .form-group {
      margin-bottom: 15px;
    }
    
    .form-group label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
      color: #333;
    }
    
    .form-control {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
    }
    
    .button-group {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-top: 20px;
    }
    
    .btn {
      padding: 10px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      text-align: center;
      transition: background-color 0.2s;
    }
    
    .btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    
    .btn-primary {
      background-color: #3498db;
      color: white;
    }
    
    .btn-primary:hover:not(:disabled) {
      background-color: #2980b9;
    }
    
    .btn-secondary {
      background-color: #95a5a6;
      color: white;
    }
    
    .btn-secondary:hover {
      background-color: #7f8c8d;
    }
    
    .btn-info {
      background-color: #2ecc71;
      color: white;
    }
    
    .btn-info:hover {
      background-color: #27ae60;
    }
    
    .transaction-list {
      padding: 15px;
      max-height: 400px;
      overflow-y: auto;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
    }
    
    th, td {
      padding: 10px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
    
    th {
      background-color: #f5f5f5;
      font-weight: bold;
    }
    
    .error-row {
      background-color: #ffecec;
    }
    
    .error-row:hover {
      background-color: #ffe0e0;
    }
    
    tr:hover {
      background-color: #f5f5f5;
    }
    `,
  ],
})
export class InterfaceTgrComponent implements OnInit {
  selectedDate = "";
  selectedOperation = "";
  status = "En attente";

  operations = [
    { id: 1, name: "Réception fichier TGR" },
    { id: 2, name: "Envoi fichier TGR" },
    { id: 3, name: "Contrôle intégration" },
  ];

  transactions = [
    { id: 1, date: "2023-04-01", type: "Réception", status: "Complété", details: "Fichier reçu avec succès" },
    { id: 2, date: "2023-04-02", type: "Envoi", status: "Erreur", details: "Échec de connexion" },
    { id: 3, date: "2023-04-03", type: "Contrôle", status: "Complété", details: "Validation réussie" },
  ];

  constructor() {
    console.log("InterfaceTgrComponent initialized");
  }

  ngOnInit(): void {
    console.log("InterfaceTgrComponent ngOnInit");
  }

  executeOperation(): void {
    console.log("Exécution de l'opération:", this.selectedOperation);
    this.status = "En cours...";

    // Simuler une opération asynchrone
    setTimeout(() => {
      this.status = "Terminé";
    }, 2000);
  }

  refreshData(): void {
    console.log("Actualisation des données");
    this.status = "Actualisation...";

    // Simuler une opération asynchrone
    setTimeout(() => {
      this.status = "En attente";
    }, 1500);
  }

  generateReport(): void {
    console.log("Génération du rapport");
  }
}
