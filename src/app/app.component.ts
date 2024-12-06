import { Component } from '@angular/core';
import {LayoutComponent} from './shared/components/layout/layout.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
    imports: [
        LayoutComponent
    ],
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'task-manager-client';
}
