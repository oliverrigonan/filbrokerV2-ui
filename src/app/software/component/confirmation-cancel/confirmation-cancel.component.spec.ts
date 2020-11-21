import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationCancelComponent } from './confirmation-cancel.component';

describe('ConfirmationCancelComponent', () => {
  let component: ConfirmationCancelComponent;
  let fixture: ComponentFixture<ConfirmationCancelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmationCancelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
