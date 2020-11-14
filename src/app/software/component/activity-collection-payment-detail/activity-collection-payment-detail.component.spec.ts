import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityCollectionPaymentDetailComponent } from './activity-collection-payment-detail.component';

describe('ActivityCollectionPaymentDetailComponent', () => {
  let component: ActivityCollectionPaymentDetailComponent;
  let fixture: ComponentFixture<ActivityCollectionPaymentDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityCollectionPaymentDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityCollectionPaymentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
