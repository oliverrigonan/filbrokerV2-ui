import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupCustomerListComponent } from './setup-customer-list.component';

describe('SetupCustomerListComponent', () => {
  let component: SetupCustomerListComponent;
  let fixture: ComponentFixture<SetupCustomerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupCustomerListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupCustomerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
