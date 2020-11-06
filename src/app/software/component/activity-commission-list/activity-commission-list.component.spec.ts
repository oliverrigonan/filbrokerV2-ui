import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityCommissionListComponent } from './activity-commission-list.component';

describe('ActivityCommissionListComponent', () => {
  let component: ActivityCommissionListComponent;
  let fixture: ComponentFixture<ActivityCommissionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityCommissionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityCommissionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
