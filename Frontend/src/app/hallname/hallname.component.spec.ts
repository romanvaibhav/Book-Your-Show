import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HallnameComponent } from './hallname.component';

describe('HallnameComponent', () => {
  let component: HallnameComponent;
  let fixture: ComponentFixture<HallnameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HallnameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HallnameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
