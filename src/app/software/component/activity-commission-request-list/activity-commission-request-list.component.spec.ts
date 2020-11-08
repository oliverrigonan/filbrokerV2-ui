import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityCommissionRequestListComponent } from './activity-commission-request-list.component';

describe('ActivityCommissionRequestListComponent', () => {
  let component: ActivityCommissionRequestListComponent;
  let fixture: ComponentFixture<ActivityCommissionRequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityCommissionRequestListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityCommissionRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
