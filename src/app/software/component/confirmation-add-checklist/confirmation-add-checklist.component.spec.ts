import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationAddChecklistComponent } from './confirmation-add-checklist.component';

describe('ConfirmationAddChecklistComponent', () => {
  let component: ConfirmationAddChecklistComponent;
  let fixture: ComponentFixture<ConfirmationAddChecklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmationAddChecklistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationAddChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
