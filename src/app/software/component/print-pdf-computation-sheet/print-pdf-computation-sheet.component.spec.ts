import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintPdfComputationSheetComponent } from './print-pdf-computation-sheet.component';

describe('PrintPdfComputationSheetComponent', () => {
  let component: PrintPdfComputationSheetComponent;
  let fixture: ComponentFixture<PrintPdfComputationSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintPdfComputationSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintPdfComputationSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
