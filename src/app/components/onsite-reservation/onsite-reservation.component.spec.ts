import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnsiteReservationComponent } from './onsite-reservation.component';

describe('OnsiteReservaionComponent', () => {
  let component: OnsiteReservationComponent;
  let fixture: ComponentFixture<OnsiteReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnsiteReservationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OnsiteReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
