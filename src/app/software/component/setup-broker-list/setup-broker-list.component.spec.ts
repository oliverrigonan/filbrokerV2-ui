import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupBrokerListComponent } from './setup-broker-list.component';

describe('SetupBrokerListComponent', () => {
  let component: SetupBrokerListComponent;
  let fixture: ComponentFixture<SetupBrokerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupBrokerListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupBrokerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
