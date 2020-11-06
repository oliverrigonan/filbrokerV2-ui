import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupChecklistListComponent } from './setup-checklist-list.component';

describe('SetupChecklistListComponent', () => {
  let component: SetupChecklistListComponent;
  let fixture: ComponentFixture<SetupChecklistListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupChecklistListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupChecklistListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
