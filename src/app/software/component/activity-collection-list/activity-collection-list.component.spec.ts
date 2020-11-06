import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityCollectionListComponent } from './activity-collection-list.component';

describe('ActivityCollectionListComponent', () => {
  let component: ActivityCollectionListComponent;
  let fixture: ComponentFixture<ActivityCollectionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityCollectionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityCollectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
