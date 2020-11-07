import { TestBed } from '@angular/core/testing';

import { SysDropdownService } from './sys-dropdown.service';

describe('SysDropdownService', () => {
  let service: SysDropdownService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SysDropdownService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
