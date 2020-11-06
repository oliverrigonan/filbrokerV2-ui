import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityCollectionDetailComponent } from './activity-collection-detail.component';

describe('ActivityCollectionDetailComponent', () => {
  let component: ActivityCollectionDetailComponent;
  let fixture: ComponentFixture<ActivityCollectionDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityCollectionDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityCollectionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
