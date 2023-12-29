import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationSumComponent } from './reservation-sum.component';

describe('ReservationSumComponent', () => {
  let component: ReservationSumComponent;
  let fixture: ComponentFixture<ReservationSumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationSumComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReservationSumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
