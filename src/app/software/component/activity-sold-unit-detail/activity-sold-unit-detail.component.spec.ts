import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitySoldUnitDetailComponent } from './activity-sold-unit-detail.component';

describe('ActivitySoldUnitDetailComponent', () => {
  let component: ActivitySoldUnitDetailComponent;
  let fixture: ComponentFixture<ActivitySoldUnitDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivitySoldUnitDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitySoldUnitDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
