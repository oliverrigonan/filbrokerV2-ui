import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintPdfSoldUnitEquityScheduleComponent } from './print-pdf-sold-unit-equity-schedule.component';

describe('PrintPdfSoldUnitEquityScheduleComponent', () => {
  let component: PrintPdfSoldUnitEquityScheduleComponent;
  let fixture: ComponentFixture<PrintPdfSoldUnitEquityScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintPdfSoldUnitEquityScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintPdfSoldUnitEquityScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
