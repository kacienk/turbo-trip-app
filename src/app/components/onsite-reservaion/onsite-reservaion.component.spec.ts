import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnsiteReservaionComponent } from './onsite-reservaion.component';

describe('OnsiteReservaionComponent', () => {
  let component: OnsiteReservaionComponent;
  let fixture: ComponentFixture<OnsiteReservaionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnsiteReservaionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OnsiteReservaionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
