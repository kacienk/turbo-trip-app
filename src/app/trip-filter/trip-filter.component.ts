import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FilterService } from '../services/filter.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trip-filter',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './trip-filter.component.html',
  styleUrl: './trip-filter.component.css',
})
export class TripFilterComponent {
  filterForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private filterService: FilterService
  ) {
    this.filterForm = this.formBuilder.group({
      location: [''],
      priceMin: [''],
      priceMax: [''],
      startDateMin: [''],
      startDateMax: [''],
      rating: [''],
    });
  }

  applyFilter() {
    const filterValues = this.filterForm.value;
    this.filterService.setFilters(filterValues);
  }

  clearFilter() {
    this.filterForm.reset();
    this.filterService.clearFilters();
  }
}
