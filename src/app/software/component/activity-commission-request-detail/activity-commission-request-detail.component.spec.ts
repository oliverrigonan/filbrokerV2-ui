import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityCommissionRequestDetailComponent } from './activity-commission-request-detail.component';

describe('ActivityCommissionRequestDetailComponent', () => {
  let component: ActivityCommissionRequestDetailComponent;
  let fixture: ComponentFixture<ActivityCommissionRequestDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityCommissionRequestDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityCommissionRequestDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
