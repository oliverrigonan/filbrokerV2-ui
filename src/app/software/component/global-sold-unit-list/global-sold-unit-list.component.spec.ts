import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalSoldUnitListComponent } from './global-sold-unit-list.component';

describe('GlobalSoldUnitListComponent', () => {
  let component: GlobalSoldUnitListComponent;
  let fixture: ComponentFixture<GlobalSoldUnitListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobalSoldUnitListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalSoldUnitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
