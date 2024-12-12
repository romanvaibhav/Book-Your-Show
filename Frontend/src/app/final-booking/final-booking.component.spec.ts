import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalBookingComponent } from './final-booking.component';

describe('FinalBookingComponent', () => {
  let component: FinalBookingComponent;
  let fixture: ComponentFixture<FinalBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinalBookingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinalBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
