import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitySoldUnitCancelReasonComponent } from './activity-sold-unit-cancel-reason.component';

describe('ActivitySoldUnitCancelReasonComponent', () => {
  let component: ActivitySoldUnitCancelReasonComponent;
  let fixture: ComponentFixture<ActivitySoldUnitCancelReasonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivitySoldUnitCancelReasonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitySoldUnitCancelReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
