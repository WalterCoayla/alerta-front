import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertViewModalComponent } from './alert-view-modal.component';

describe('AlertViewModalComponent', () => {
  let component: AlertViewModalComponent;
  let fixture: ComponentFixture<AlertViewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertViewModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
