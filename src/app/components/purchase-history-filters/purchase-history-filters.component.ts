import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-purchase-history-filters',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './purchase-history-filters.component.html',
  styleUrl: './purchase-history-filters.component.css',
})
export class PurchaseHistoryFiltersComponent {
  applyFilters(): void {}

  clearFilters(): void {}
}
