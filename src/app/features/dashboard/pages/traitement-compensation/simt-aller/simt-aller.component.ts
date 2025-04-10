import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../../sidebar/sidebar.component';

@Component({
  selector: 'app-simt-aller',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  templateUrl: './simt-aller.component.html',
  styleUrls: ['./simt-aller.component.css']
})
export class SimtAllerComponent {}
