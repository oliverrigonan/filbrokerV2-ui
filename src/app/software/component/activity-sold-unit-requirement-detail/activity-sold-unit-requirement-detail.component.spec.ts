import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitySoldUnitRequirementDetailComponent } from './activity-sold-unit-requirement-detail.component';

describe('ActivitySoldUnitRequirementDetailComponent', () => {
  let component: ActivitySoldUnitRequirementDetailComponent;
  let fixture: ComponentFixture<ActivitySoldUnitRequirementDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivitySoldUnitRequirementDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitySoldUnitRequirementDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
