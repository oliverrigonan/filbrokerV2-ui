import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintPdfReservationAgreementComponent } from './print-pdf-reservation-agreement.component';

describe('PrintPdfReservationAgreementComponent', () => {
  let component: PrintPdfReservationAgreementComponent;
  let fixture: ComponentFixture<PrintPdfReservationAgreementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintPdfReservationAgreementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintPdfReservationAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
