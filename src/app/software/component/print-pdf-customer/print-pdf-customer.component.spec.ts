import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintPdfCustomerComponent } from './print-pdf-customer.component';

describe('PrintPdfCustomerComponent', () => {
  let component: PrintPdfCustomerComponent;
  let fixture: ComponentFixture<PrintPdfCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintPdfCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintPdfCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
