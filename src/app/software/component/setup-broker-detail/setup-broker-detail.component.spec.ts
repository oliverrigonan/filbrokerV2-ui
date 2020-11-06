import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupBrokerDetailComponent } from './setup-broker-detail.component';

describe('SetupBrokerDetailComponent', () => {
  let component: SetupBrokerDetailComponent;
  let fixture: ComponentFixture<SetupBrokerDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupBrokerDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupBrokerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
