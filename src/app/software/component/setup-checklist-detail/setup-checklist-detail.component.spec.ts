import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupChecklistDetailComponent } from './setup-checklist-detail.component';

describe('SetupChecklistDetailComponent', () => {
  let component: SetupChecklistDetailComponent;
  let fixture: ComponentFixture<SetupChecklistDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupChecklistDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupChecklistDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
