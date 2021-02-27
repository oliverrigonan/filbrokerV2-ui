import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitySoldUnitEquityScheduleDetailComponent } from './activity-sold-unit-equity-schedule-detail.component';

describe('ActivitySoldUnitEquityScheduleDetailComponent', () => {
  let component: ActivitySoldUnitEquityScheduleDetailComponent;
  let fixture: ComponentFixture<ActivitySoldUnitEquityScheduleDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivitySoldUnitEquityScheduleDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitySoldUnitEquityScheduleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
