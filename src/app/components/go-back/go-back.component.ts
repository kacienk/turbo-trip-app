import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-go-back',
  standalone: true,
  imports: [],
  templateUrl: './go-back.component.html',
  styleUrl: './go-back.component.css',
})
export class GoBackComponent {
  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
