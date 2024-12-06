import {Component} from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-error',
  imports: [],
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss'
})
export class ErrorComponent {

  constructor(private location: Location) {
  }

  goBack(): void {
    this.location.back();
  }
}
