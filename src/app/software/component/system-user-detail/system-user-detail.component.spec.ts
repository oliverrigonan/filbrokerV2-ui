import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemUserDetailComponent } from './system-user-detail.component';

describe('SystemUserDetailComponent', () => {
  let component: SystemUserDetailComponent;
  let fixture: ComponentFixture<SystemUserDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemUserDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemUserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
