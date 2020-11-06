import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupUnitListComponent } from './setup-unit-list.component';

describe('SetupUnitListComponent', () => {
  let component: SetupUnitListComponent;
  let fixture: ComponentFixture<SetupUnitListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupUnitListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupUnitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
