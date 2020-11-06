import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupProjectDetailComponent } from './setup-project-detail.component';

describe('SetupProjectDetailComponent', () => {
  let component: SetupProjectDetailComponent;
  let fixture: ComponentFixture<SetupProjectDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupProjectDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupProjectDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
