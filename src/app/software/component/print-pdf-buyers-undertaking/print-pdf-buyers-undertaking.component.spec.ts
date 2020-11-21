import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintPdfBuyersUndertakingComponent } from './print-pdf-buyers-undertaking.component';

describe('PrintPdfBuyersUndertakingComponent', () => {
  let component: PrintPdfBuyersUndertakingComponent;
  let fixture: ComponentFixture<PrintPdfBuyersUndertakingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintPdfBuyersUndertakingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintPdfBuyersUndertakingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
