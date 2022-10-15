import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintPdfStatementOfAccountComponent } from './print-pdf-statement-of-account.component';

describe('PrintPdfStatementOfAccountComponent', () => {
  let component: PrintPdfStatementOfAccountComponent;
  let fixture: ComponentFixture<PrintPdfStatementOfAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintPdfStatementOfAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintPdfStatementOfAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
