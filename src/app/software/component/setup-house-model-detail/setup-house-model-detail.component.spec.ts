import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupHouseModelDetailComponent } from './setup-house-model-detail.component';

describe('SetupHouseModelDetailComponent', () => {
  let component: SetupHouseModelDetailComponent;
  let fixture: ComponentFixture<SetupHouseModelDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupHouseModelDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupHouseModelDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
