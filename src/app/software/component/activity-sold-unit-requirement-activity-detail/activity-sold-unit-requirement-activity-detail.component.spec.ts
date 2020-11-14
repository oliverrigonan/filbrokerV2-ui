import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitySoldUnitRequirementActivityDetailComponent } from './activity-sold-unit-requirement-activity-detail.component';

describe('ActivitySoldUnitRequirementActivityDetailComponent', () => {
  let component: ActivitySoldUnitRequirementActivityDetailComponent;
  let fixture: ComponentFixture<ActivitySoldUnitRequirementActivityDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivitySoldUnitRequirementActivityDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitySoldUnitRequirementActivityDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
