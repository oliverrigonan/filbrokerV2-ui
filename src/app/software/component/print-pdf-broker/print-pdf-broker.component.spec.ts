import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintPdfBrokerComponent } from './print-pdf-broker.component';

describe('PrintPdfBrokerComponent', () => {
  let component: PrintPdfBrokerComponent;
  let fixture: ComponentFixture<PrintPdfBrokerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintPdfBrokerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintPdfBrokerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
