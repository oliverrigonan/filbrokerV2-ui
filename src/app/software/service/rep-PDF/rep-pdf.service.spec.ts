import { TestBed } from '@angular/core/testing';

import { RepPDFService } from './rep-pdf.service';

describe('RepPDFService', () => {
  let service: RepPDFService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepPDFService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
