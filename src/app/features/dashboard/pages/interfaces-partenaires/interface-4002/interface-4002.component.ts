import { Component, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common"
import { Router, RouterModule } from "@angular/router"
import { AuthService } from '../../../../../core/services/auth.service';
import { SidebarComponent } from '../../../sidebar/sidebar.component';
@Component({
  selector: 'app-interface-4002',
  templateUrl: './interface-4002.component.html',
  styleUrls: ['./interface-4002.component.css'],
  imports: [CommonModule, RouterModule, SidebarComponent],

})
export class Interface4002Component implements OnInit {
  currentDate = new Date().toLocaleDateString();

  constructor(
    private router: Router, // Injection correcte du Router
    public authService: AuthService
  ) {
    console.log('SidebarComponent initialized');
  }

  logout(): void {
    this.authService.logout();
  }

  ngOnInit(): void { }

  listFiles(): void {
    console.log('Listing files...');
  }

  generateFile(): void {
    console.log('Generating file...');
  }

  performControl(): void {
    console.log('Performing file control...');
  }

  refresh(): void {
    console.log('Refreshing data...');
  }

  quit(): void {
    this.router.navigate(['/dashboard']);
  }
}