import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupProjectListComponent } from './setup-project-list.component';

describe('SetupProjectListComponent', () => {
  let component: SetupProjectListComponent;
  let fixture: ComponentFixture<SetupProjectListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupProjectListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupProjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
