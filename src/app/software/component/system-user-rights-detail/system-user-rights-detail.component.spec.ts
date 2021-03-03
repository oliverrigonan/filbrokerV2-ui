import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemUserRightsDetailComponent } from './system-user-rights-detail.component';

describe('SystemUserRightsDetailComponent', () => {
  let component: SystemUserRightsDetailComponent;
  let fixture: ComponentFixture<SystemUserRightsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemUserRightsDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemUserRightsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
