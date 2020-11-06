import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupCustomerDetailComponent } from './setup-customer-detail.component';

describe('SetupCustomerDetailComponent', () => {
  let component: SetupCustomerDetailComponent;
  let fixture: ComponentFixture<SetupCustomerDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupCustomerDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupCustomerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
