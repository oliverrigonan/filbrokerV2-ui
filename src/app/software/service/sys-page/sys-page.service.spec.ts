import { TestBed } from '@angular/core/testing';

import { SysPageService } from './sys-page.service';

describe('SysPageService', () => {
  let service: SysPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SysPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
