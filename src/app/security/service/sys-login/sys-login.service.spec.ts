import { TestBed } from '@angular/core/testing';

import { SysLoginService } from './sys-login.service';

describe('SysLoginService', () => {
  let service: SysLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SysLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
