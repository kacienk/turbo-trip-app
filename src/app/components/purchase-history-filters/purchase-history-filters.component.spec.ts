import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseHistoryFiltersComponent } from './purchase-history-filters.component';

describe('PurchaseHistoryFiltersComponent', () => {
  let component: PurchaseHistoryFiltersComponent;
  let fixture: ComponentFixture<PurchaseHistoryFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseHistoryFiltersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PurchaseHistoryFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
