import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemLoginComponent } from './system-login.component';

describe('SystemLoginComponent', () => {
  let component: SystemLoginComponent;
  let fixture: ComponentFixture<SystemLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
