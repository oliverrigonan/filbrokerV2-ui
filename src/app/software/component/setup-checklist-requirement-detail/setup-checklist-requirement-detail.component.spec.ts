import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupChecklistRequirementDetailComponent } from './setup-checklist-requirement-detail.component';

describe('SetupChecklistRequirementDetailComponent', () => {
  let component: SetupChecklistRequirementDetailComponent;
  let fixture: ComponentFixture<SetupChecklistRequirementDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupChecklistRequirementDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupChecklistRequirementDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
