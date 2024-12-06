import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {RouterLink, RouterOutlet} from '@angular/router';
import {MatSidenavContainer, MatSidenavModule} from '@angular/material/sidenav';
import {MatDivider} from '@angular/material/divider';

@Component({
  selector: 'app-layout',
  standalone: true,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterLink, MatSidenavContainer, MatDivider, RouterOutlet, MatSidenavModule]
})
export class LayoutComponent {

}
