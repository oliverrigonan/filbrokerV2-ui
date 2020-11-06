import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityCommissionDetailComponent } from './activity-commission-detail.component';

describe('ActivityCommissionDetailComponent', () => {
  let component: ActivityCommissionDetailComponent;
  let fixture: ComponentFixture<ActivityCommissionDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityCommissionDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityCommissionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
