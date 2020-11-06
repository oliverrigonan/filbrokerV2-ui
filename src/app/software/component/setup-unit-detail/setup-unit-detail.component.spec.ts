import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupUnitDetailComponent } from './setup-unit-detail.component';

describe('SetupUnitDetailComponent', () => {
  let component: SetupUnitDetailComponent;
  let fixture: ComponentFixture<SetupUnitDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupUnitDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupUnitDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
