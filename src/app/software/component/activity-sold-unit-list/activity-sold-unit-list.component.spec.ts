import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitySoldUnitListComponent } from './activity-sold-unit-list.component';

describe('ActivitySoldUnitListComponent', () => {
  let component: ActivitySoldUnitListComponent;
  let fixture: ComponentFixture<ActivitySoldUnitListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivitySoldUnitListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitySoldUnitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
