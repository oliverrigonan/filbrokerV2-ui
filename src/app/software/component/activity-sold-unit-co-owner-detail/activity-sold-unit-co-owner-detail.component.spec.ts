import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitySoldUnitCoOwnerDetailComponent } from './activity-sold-unit-co-owner-detail.component';

describe('ActivitySoldUnitCoOwnerDetailComponent', () => {
  let component: ActivitySoldUnitCoOwnerDetailComponent;
  let fixture: ComponentFixture<ActivitySoldUnitCoOwnerDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivitySoldUnitCoOwnerDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitySoldUnitCoOwnerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
