import { Component, OnInit } from "@angular/core";
import { Router, RouterModule } from "@angular/router";  // Importer le Router
import { AuthService } from "../../../../../core/services/auth.service";
import { CommonModule } from "@angular/common"
import { SidebarComponent } from "../../../sidebar/sidebar.component";


@Component({
  selector: "app-interface-tgr",
  standalone: true,
  templateUrl: "./interface-tgr.component.html",
  styleUrls: ["./interface-tgr.component.css"],
  imports: [CommonModule, RouterModule, SidebarComponent],
})


export class InterfaceTgrComponent implements OnInit {
  currentDate: string = "";
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