import { Component, OnInit } from '@angular/core';
import {
  HistoryFilter,
  HistoryFilterService,
} from '../../services/history-filter.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-history-filter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './history-filter.component.html',
  styleUrl: './history-filter.component.css',
})
export class HistoryFilterComponent implements OnInit {
  historyFilters: HistoryFilter = { past: true, active: true, future: true };

  constructor(private historyFilterService: HistoryFilterService) {}

  applyFilters(): void {
    console.log(this.historyFilters);
    this.historyFilterService.setFilters(this.historyFilters);
  }

  clearFilters(): void {
    this.historyFilterService.clearFilters();
  }

  ngOnInit(): void {
    this.historyFilterService.filters$.subscribe((filters) => {
      this.historyFilters = filters;
    });
  }
}
