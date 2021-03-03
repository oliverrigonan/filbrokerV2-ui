import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemUserRegisterComponent } from './system-user-register.component';

describe('SystemUserRegisterComponent', () => {
  let component: SystemUserRegisterComponent;
  let fixture: ComponentFixture<SystemUserRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemUserRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemUserRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
