import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitySoldUnitImportEquityScheduleComponent } from './activity-sold-unit-import-equity-schedule.component';

describe('ActivitySoldUnitImportEquityScheduleComponent', () => {
  let component: ActivitySoldUnitImportEquityScheduleComponent;
  let fixture: ComponentFixture<ActivitySoldUnitImportEquityScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivitySoldUnitImportEquityScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitySoldUnitImportEquityScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
