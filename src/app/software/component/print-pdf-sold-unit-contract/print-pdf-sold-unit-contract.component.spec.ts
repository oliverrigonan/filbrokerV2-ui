import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintPdfSoldUnitContractComponent } from './print-pdf-sold-unit-contract.component';

describe('PrintPdfSoldUnitContractComponent', () => {
  let component: PrintPdfSoldUnitContractComponent;
  let fixture: ComponentFixture<PrintPdfSoldUnitContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintPdfSoldUnitContractComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintPdfSoldUnitContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
