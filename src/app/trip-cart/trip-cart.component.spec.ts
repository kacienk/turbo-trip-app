import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripCartComponent } from './trip-cart.component';

describe('TripCartComponent', () => {
  let component: TripCartComponent;
  let fixture: ComponentFixture<TripCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripCartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TripCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
