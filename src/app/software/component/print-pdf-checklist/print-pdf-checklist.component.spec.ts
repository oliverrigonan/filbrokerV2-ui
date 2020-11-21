import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintPdfChecklistComponent } from './print-pdf-checklist.component';

describe('PrintPdfChecklistComponent', () => {
  let component: PrintPdfChecklistComponent;
  let fixture: ComponentFixture<PrintPdfChecklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintPdfChecklistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintPdfChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
