import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreBookComponent } from './pre-book.component';

describe('PreBookComponent', () => {
  let component: PreBookComponent;
  let fixture: ComponentFixture<PreBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreBookComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
