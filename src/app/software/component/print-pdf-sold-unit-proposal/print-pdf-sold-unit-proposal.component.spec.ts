import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintPdfSoldUnitProposalComponent } from './print-pdf-sold-unit-proposal.component';

describe('PrintPdfSoldUnitProposalComponent', () => {
  let component: PrintPdfSoldUnitProposalComponent;
  let fixture: ComponentFixture<PrintPdfSoldUnitProposalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintPdfSoldUnitProposalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintPdfSoldUnitProposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
