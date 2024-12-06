import {Component, Input} from '@angular/core';
import {MatCard} from "@angular/material/card";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-skeleton',
  imports: [
    MatCard,
    NgForOf,
    NgIf
  ],
  templateUrl: './skeleton.component.html',
  styleUrl: './skeleton.component.scss'
})
export class SkeletonComponent {
  @Input() isLoading: boolean = false;
  skeletonCards = new Array(12);
}
