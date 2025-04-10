import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../../sidebar/sidebar.component';

@Component({
  selector: 'app-discordance-olympic',
  standalone: true,
  imports: [CommonModule,SidebarComponent],
  templateUrl: './discordance-olympic.component.html',
  styleUrls: ['./discordance-olympic.component.css']
})
export class DiscordanceOlympicComponent {
  currentDate: string = new Date().toLocaleDateString();

  // Tu peux rajouter des données dynamiques ici plus tard si besoin
}
