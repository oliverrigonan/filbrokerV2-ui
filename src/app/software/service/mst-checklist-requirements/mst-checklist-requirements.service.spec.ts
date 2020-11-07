import { TestBed } from '@angular/core/testing';

import { MstChecklistRequirementsService } from './mst-checklist-requirements.service';

describe('MstChecklistRequirementsService', () => {
  let service: MstChecklistRequirementsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MstChecklistRequirementsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
